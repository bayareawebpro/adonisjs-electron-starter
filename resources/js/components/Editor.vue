<script>
  import ace from "ace-builds/src-noconflict/ace";
  ace.config.setModuleUrl("ace/mode/sh", require("ace-builds/src-noconflict/mode-sh"))
  ace.config.setModuleUrl("ace/mode/text", require("ace-builds/src-noconflict/mode-text"))
  ace.config.setModuleUrl("ace/mode/nginx", require("ace-builds/src-noconflict/mode-nginx"))
  ace.config.setModuleUrl("ace/theme/dracula", require("ace-builds/src-noconflict/theme-dracula"))
    export default {
        props: {
            value: {
                required: true
            },
            default: {
                required: false,
                default: ()=> ''
            },
            lang: {
                type: String,
                default: ()=> 'sh'
            },
            theme: {
                type: String,
                default: ()=> 'dracula'
            },
            minLines: {
                type: Number,
                default: ()=> 6
            },
            maxLines: {
                type: Number,
                default: ()=> 20
            },
            fontSize: {
                type: Number,
                default: ()=> 13
            }
        },
        data () {
            return {
                content: this.value
            }
        },
        watch: {
            value(value) {
                if (this.content !== value) {
                    this.$options.editor.setValue(value, 1)
                }
            }
        },
        methods:{
            init(){
                this.$options.editor = ace.edit(this.$refs.editor, {
                    mode: `ace/mode/${this.lang}`,
                    theme:`ace/theme/${this.theme}`,
                    readOnly: this.disabled,
                    fontSize: this.fontSize,
                    maxLines: this.maxLines,
                    minLines: this.minLines,
                    wrap: true,
                    showPrintMargin: false,
                })
                this.$options.editor.on('change', () => {
                    this.content = this.$options.editor.getValue()
                    this.$emit('input', this.content)
                })
                this.$options.editor.setValue(this.content || this.default, 1)
            }
        },
        created() {
          this.$nextTick(this.init)
        }
    }
</script>
<template>
  <div>
    <div ref="editor" class="w-full"></div>
  </div>
</template>
