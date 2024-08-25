<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :default-config="toolbarConfig"
        :mode="mode"
    />
    <Editor
        v-model="html"
        style="height: 200px; overflow-y: hidden;"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
        @onChange="onChange"
    />
  </div>
</template>
<script>
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
export default {
  components: {Editor, Toolbar},
  props: {
    content: {
      type: String,
      required: false, // 是否必填
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: {
        autoFocus: false,


      },
      // mode: 'default' // or 'simple'
      mode: 'simple' // or 'simple'
    }
  },
  created() {
    this.html = this.content
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
    console.log('wangEditor销毁了')
  },
  methods: {
    onCreated(editor) {
      console.log(editor)
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(e) {
      console.log(e)
      this.$emit('EditorChange', this.html)
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css">

</style>
