<h1>VueCkeditor5</h1>

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/igorxut/vue-ckeditor5/blob/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/vue-ckeditor5.svg)](https://www.npmjs.com/package/vue-ckeditor5)
[![File size](https://img.shields.io/github/size/igorxut/vue-ckeditor5/dist/vue-ckeditor5.js.svg)](https://github.com/igorxut/vue-ckeditor5/blob/master/dist/vue-ckeditor5.js)

<h2>Description</h2>

<div>
  <a href="https://github.com/vuejs/vue" target="_blank"><img alt="Vue 2" src="https://vuejs.org/images/logo.png" title="Vue 2" width="50" /></a>
  <a href="https://github.com/ckeditor" target="_blank"><img alt="CKEditor 5" src="https://avatars2.githubusercontent.com/u/825710?s=200&v=4" title="CKEditor 5" width="50" /></a>
</div>

<p>Component CKEditor&nbsp;5 for Vue&nbsp;2.</p>

<h2>Installation</h2>

<h3>NMP</h3>

```shell
npm install vue-ckeditor5
```

<h3>Manual</h3>

<p><a href="https://github.com/igorxut/vue-ckeditor5/blob/master/dist/vue-ckeditor5.js" target="_blank">Download file</a> from repository, paste it in your project and insert path to it in your page by code:

```html
<script src="vue-ckeditor5.js"></script>
```
</p>

<p></p>

<h2>Usage</h2>

<h3>How to</h3>

<p>You must paste CKEditor's&nbsp;5 implementations to vue component. You can use even <a href="https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html" target="_blank">custom build</a> of CKEditor&nbsp;5.</p>

<p>See <a href="https://github.com/igorxut/vue-ckeditor5/blob/master/examples" target="_blank">examples</a>.</p>

<h4>First way - Global</h4>

<p>You can register component globaly by plugin (recommended):</p>

```javascript
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'

const options = {
  editors: {
    classic: ClassicEditor,
  },
  name: 'ckeditor'
}

Vue.use(VueCkeditor.plugin, options);
```

<p>Then you can use the component in your template:</p>

```html
<ckeditor type="classic" v-model="value1"></ckeditor>
```

<h5>Plugin options</h5>

<table>
  <thead>
    <tr>
      <th>property</th>
      <th>type</th>
      <th>required</th>
      <th>default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>editors</td>
      <td>Object</td>
      <td>true</td>
      <td></td>
      <td>
        Map of editors:
        <ul>
          <li>value - CKEditor&nbsp;5 implementation</li>
          <li>key - alias for it (for prop '<a href="#prop-type">type</a>')</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>false</td>
      <td><code>'vue-ckeditor'</code></td>
      <td>Name of component.</td>
    </tr>
  </tbody>
</table>

<h4>Second way - Local</h4>

<p>You can register component localy:</p>

```javascript
import Vue from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'

new Vue({
  el: '#app',
  components: {
    'vue-ckeditor': VueCkeditor.component
  },
  data: {
    value1: 'hello',
    value2: 'world',
    editors: {
      classic: ClassicEditor
    }
  },
  template:
  `<vue-ckeditor type="classic" v-model="value1" :editors="editors"></vue-ckeditor>`
})
```

<h3>Component's props</h3>

<table>
  <thead>
    <tr>
      <th>prop</th>
      <th>type</th>
      <th>required</th>
      <th>default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>config</td>
      <td>Object</td>
      <td>false</td>
      <td><code>{language:'en'}</code></td>
      <td>Object with <a href="https://docs.ckeditor.com/ckeditor5/latest/builds/guides/integration/configuration.html" target="_blank">config</a> properties for CKEditor&nbsp;5 instance.</td>
    </tr>
    <tr>
      <td><a name="prop-editors">editors</a></td>
      <td>Object</td>
      <td>false</td>
      <td><code>{}</code></td>
      <td>
        Map of editors:
        <ul>
          <li>value - CKEditor&nbsp;5 implementation</li>
          <li>key - alias for it (for prop '<a href="#prop-type">type</a>')</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>readonly</td>
      <td>Boolean</td>
      <td>false</td>
      <td><code>false</code></td>
      <td>Read-only mode for CKEditor&nbsp;5 instance.</td>
    </tr>
    <tr>
      <td><a name="prop-type">toolbarContainer</a></td>
      <td>String</td>
      <td>false</td>
      <td>null</td>
      <td>CSS-selector of DOM-element for CKEditor toolbar. The element is searched by <a href="//developer.mozilla.org/en-US/docs/Web/API/Document/querySelector" target="_blank">Document.querySelector()</a>.</td>
    </tr>
    <tr>
      <td><a name="prop-type">type</a></td>
      <td>String</td>
      <td>true</td>
      <td></td>
      <td>Key for CKEditor&nbsp;5 implementation of '<a href="#prop-type">editors</a>' prop.</td>
    </tr>
    <tr>
      <td>uploadAdapter</td>
      <td>Function</td>
      <td>false</td>
      <td>null</td>
      <td><a href="https://ckeditor.com/docs/ckeditor5/latest/api/module_upload_filerepository-UploadAdapter.html" target="_blank">CKEditor UploadAdapter implementation</a>.</td>
    </tr>
    <tr>
      <td>value</td>
      <td>String</td>
      <td>true</td>
      <td><code>''</code></td>
      <td>Value for data bindings. Use '<a href="https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model" target="_blank">v-model</a>' for it.</td>
    </tr>
  </tbody>
</table>

<h2>License</h2>

<p><a href="http://opensource.org/licenses/MIT" target="_blank">MIT</a></p>
