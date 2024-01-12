<script setup>
import { computed, reactive, ref } from 'vue'
import API from '@/api'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const loading = ref(false)
const commentForm = ref()
const maxLength = ref(1000)
const formRules = reactive({
  comment: ''
})
const rules = reactive({
  comment: [
    { required: true, message: 'Комментарий не может пустым', trigger: 'blur' },
    { min: 0, max: 1000, message: 'Комментарий не может превышать 1000 символов', trigger: ['change', 'blur'] },
  ]
})

async function submitForm() {
  if (!commentForm.value) return

  await commentForm.value.validate((valid, fields) => {
    if (valid) {
      emit('submit', formRules.comment)
      closeModal()
    } else {
      ElMessage({
        message: fields.comment[0].message,
        type: 'error'
      })
    }
  })
}

function closeModal() {
  if (!commentForm.value) return
  commentForm.value.resetFields()
  emit('update:modelValue', false)
}

const showModal = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const reachedMaximumValue = computed(() => formRules.comment.length > maxLength.value)
</script>

<template>
  <el-dialog v-model="showModal" class="comment-modal" @closed="closeModal">
    <template #header>
      <h3 class="font-medium text-2xl">Отправить карточку на доработку</h3>

    </template>

    <div class="comment-modal-content px-5 py-5 text-[16px]">
      <el-form
        ref="commentForm"
        :model="formRules"
        label-position="top"
        status-icon
        :rules="rules"
      >
        <el-form-item label="Комментарий к отправке на доработку" prop="comment">
          <el-input
            v-model="formRules.comment"
            :autosize="{ minRows: 6, maxRows: 20 }"
            type="textarea"
            placeholder="Комментарий..."
          />
          <span :class="['absolute right-0 bottom-[-30px]', reachedMaximumValue && 'text-red-500']">
              {{ formRules.comment.length }}/{{ maxLength }}
          </span>
        </el-form-item>

        <div class="flex items-center h-10 justify-between mt-12">
          <el-button @click="$emit('update:modelValue', false)">Отменить</el-button>
          <el-button
            type="primary"
            :disabled="!formRules.comment.trim() || reachedMaximumValue"
            :loading="loading"
            @click="submitForm"
          >
            Отправить на доработку
          </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>
