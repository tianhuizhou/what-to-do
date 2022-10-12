<template>
  <div class="tiptap-editor-wrapper">
    <div v-if="editor" class="tiptap-toolbar-wrapper">
      <div class="tiptap-toolbar">
        <!-- Undo / Redo -->
        <button class="btn btn-sm btn-tiptap" @click="editor.chain().focus().undo().run()" :disabled="disabled">
          <i class="fir-arrow-hook-up-left"></i>
        </button>
        <button class="btn btn-sm btn-tiptap" @click="editor.chain().focus().redo().run()" :disabled="disabled">
          <i class="fir-arrow-hook-up-right"></i>
        </button>

        <span class="border-end h-50"></span>

        <!-- Heading -->
        <el-popover trigger="click" width="160">
          <template #reference>
            <button class="btn btn-sm btn-tiptap">
              <span style="transform: scaleX(-1)" class="d-inline-block">
                <i class="fir-text-font-size" :class="{ 'text-dark': editor.isActive('heading') }"></i>
              </span>
              <i class="fis-caret-down mx-1 fs-4"></i>
            </button>
          </template>
          <div class="d-flex justify-content-evenly align-items-bottom">
            <button
              class="btn btn-tiptap"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
              :disabled="disabled"
            >
              <span class="h1 mx-1 my-0" style="color: inherit; line-height: 35px">H1</span>
            </button>

            <button
              class="btn btn-tiptap"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
              :disabled="disabled"
            >
              <span class="h2 mx-1 my-0" style="color: inherit; line-height: 35px">H2</span>
            </button>

            <button
              class="btn btn-tiptap"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
              :disabled="disabled"
            >
              <span class="h3 mx-1 my-0" style="color: inherit; line-height: 35px">H3</span>
            </button>

            <button
              class="btn btn-tiptap"
              @click="editor.chain().focus().setParagraph().run()"
              :class="{ 'is-active': editor.isActive('paragraph') }"
              :disabled="disabled"
            >
              <i class="fis-text fs-4 px-1"></i>
            </button>
          </div>
        </el-popover>

        <span class="border-end h-50"></span>

        <!-- bold, italic, strike -->
        <button
          class="btn btn-sm btn-tiptap"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="disabled"
        >
          <i class="fir-text-bold"></i>
        </button>

        <button
          class="btn btn-sm btn-tiptap"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="disabled"
        >
          <i class="fir-text-italic"></i>
        </button>

        <button
          class="btn btn-sm btn-tiptap"
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="disabled"
        >
          <i class="fir-text-strikethrough"></i>
        </button>

        <span class="border-end h-50"></span>

        <button
          class="btn btn-sm btn-tiptap"
          @click="editor.chain().focus().unsetAllMarks().clearNodes().run()"
          :disabled="disabled"
        >
          <i class="fir-clear-formatting"></i>
        </button>

        <!-- More -->
        <el-popover trigger="click" width="100">
          <template #reference>
            <button class="btn btn-sm btn-tiptap">
              <i class="fir-more"></i>
            </button>
          </template>
          <div class="d-flex justify-content-evenly align-items-center">
            <button
              class="btn btn-sm btn-tiptap"
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }"
              :disabled="disabled"
            >
              <i class="fir-text-bullet-list"></i>
            </button>

            <button
              class="btn btn-sm btn-tiptap"
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'is-active': editor.isActive('orderedList') }"
              :disabled="disabled"
            >
              <i class="fir-text-number-list-ltr"></i>
            </button>

            <button
              class="btn btn-sm btn-tiptap"
              @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{ 'is-active': editor.isActive('blockquote') }"
              :disabled="disabled"
            >
              <i class="fir-text-quote"></i>
            </button>

            <button
              class="btn btn-sm btn-tiptap"
              @click="editor.chain().focus().setHorizontalRule().run()"
              :disabled="disabled"
            >
              <span style="transform: rotate(90deg)" class="d-inline-block"><i class="fis-divider-short"></i></span>
            </button>

            <button
              class="btn btn-sm btn-tiptap"
              :class="{ 'is-active': editor.isActive('code') }"
              @click="editor.chain().focus().toggleCode().run()"
              :disabled="disabled"
            >
              <i class="fir-code"></i>
            </button>
          </div>
        </el-popover>
      </div>
    </div>
    <editor-content :editor="editor" class="tiptap-editor rich-text" />
  </div>
</template>

<script>
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'

  export default {
    name: 'rich-text-editor',
    props: {
      'value': { type: String, required: true },
      'disabled': { type: Boolean, default: false },
    },
    components: {
      'editor-content': EditorContent,
    },
    data() {
      return {
        editor: null,
      }
    },
    computed: {},
    methods: {
      initEditor() {
        this.editor = new Editor({
          extensions: [StarterKit],
          content: this.value,
          editable: !this.disabled,
          onUpdate: () => this.$emit('input', this.editor.getHTML()),
          onFocus: () => this.$emit('focus'),
          onBlur: () => this.$emit('blur'),
        })
      },
    },
    mounted() {
      this.initEditor()
    },

    beforeUnmount() {
      this.editor.destroy()
    },

    watch: {
      'value'(data) {
        if (data === '') this.editor.commands.clearContent(true)
      },
    },
  }
</script>
<style lang="scss"></style>
