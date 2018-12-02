export default {
  name: 'vue-ckeditor',

  render (createElement) {
    return createElement(this.tag, {
      attrs: this.$attrs
    })
  },

  props: {
    config: {
      default: () => {
        return {
          language: 'en'
        }
      },
      required: false,
      type: Object
    },

    editors: {
      default: () => {
        return {}
      },
      required: false,
      type: Object
    },

    readonly: {
      default: () => false,
      required: false,
      type: Boolean
    },

    emptyValue: {
      required: false,
      type: String
    },

    tag: {
      default: () => 'div',
      required: false,
      type: String
    },

    toolbarContainer: {
      default: () => null,
      required: false,
      type: String
    },

    type: {
      required: true,
      type: String
    },

    uploadAdapter: {
      default: () => null,
      required: false,
      type: Function
    },

    value: {
      default: () => '',
      required: false,
      type: String
    }
  },

  data () {
    return {
      instance: null
    }
  },

  watch: {
    value (newValue) {
      const instance = this.instance

      if (
        instance != null &&
        newValue !== instance.getData() &&
        !(
          this.emptyValueProvided &&
          newValue === this.emptyValue
        )
      ) {
        instance.setData(newValue)
      }
    }
  },

  computed: {
    emptyValueProvided () {
      return this.$options.propsData.hasOwnProperty('emptyValue')
    },
    isEmpty () {
      const document = this.instance.model.document
      return !document.model.hasContent(document.getRoot())
    }
  },

  methods: {
    create () {
      if (this.instance == null) {
        const type = this.type
        const editors = this.$VueCkeditorEditors || this.editors

        if (!Object.keys(editors).length) {
          throw new Error(`There are no CKEditor 5 implementations.`)
        }

        const editor = editors[type]

        if (editor == null) {
          throw new Error(`Wrong key '${type}'. Allowed keys: ${Object.keys(editors)}`)
        }

        editor
          .create(this.$el, this.config)
          .then(editor => {
            this.instance = editor
            const instance = this.instance

            this.createUploadAdapter()

            this.createToolbarContainer()

            this.setEventListeners()

            instance.isReadOnly = this.readonly
            instance.setData(this.value)

            this.$emit('ready', instance)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    createToolbarContainer () {
      const instance = this.instance
      const toolbarContainer = this.toolbarContainer

      if (
        toolbarContainer != null &&
        instance != null
      ) {
        const toolbarContainerElement = document.querySelector(toolbarContainer)

        if (toolbarContainerElement != null) {
          toolbarContainerElement.appendChild(instance.ui.view.toolbar.element)
        }
      }
    },
    createUploadAdapter () {
      const UploadAdapter = this.uploadAdapter
      const instance = this.instance

      if (
        UploadAdapter != null &&
        instance != null
      ) {
        const fileRepository = instance.plugins.get('FileRepository')

        if (fileRepository != null) {
          fileRepository.createUploadAdapter = (loader) => new UploadAdapter(loader)
        }
      }
    },
    destroy () {
      const instance = this.instance

      if (instance != null) {
        instance.destroy()
        this.$emit('destroy', instance)
      }
    },
    setEventListeners () {
      const instance = this.instance

      if (instance != null) {
        instance.model.document.on('change:data', (...args) => {
          let newValue = instance.getData()

          if (this.value !== newValue) {
            if (
              this.emptyValueProvided &&
              this.isEmpty
            ) {
              newValue = this.emptyValue
            }

            this.$emit('input', newValue, instance, ...args)
          }
        })

        const editingViewDocument = instance.editing.view.document
        const events = editingViewDocument._events
        for (const key of Object.keys(events)) {
          editingViewDocument.on(key, (...args) => {
            this.$emit(key, instance, ...args)
          })
        }
      }
    }
  },

  mounted () {
    this.create()
  },

  beforeDestroy () {
    this.destroy()
  }
}
