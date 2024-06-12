<script setup>
import { reactive } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

const mainStore = useMainStore()
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const full_name = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select(`username, avatar_url, full_name`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  avatar_path.value = data.avatar_url
  full_name.value = data.full_name
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      full_name: full_name.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail
})

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: ''
})

const submitProfile = () => {
  mainStore.setUser(profileForm)
}

const submitPass = () => {
  //
}
</script>

<template>
  <div>
    <NuxtLayout name="authenticated">

      <SectionMain>
        <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
          <BaseButton
            href="https://github.com/justboil/admin-one-vue-tailwind"
            target="_blank"
            :icon="mdiGithub"
            label="Star on GitHub"
            color="contrast"
            rounded-full
            small
          />
        </SectionTitleLineWithButton>

        <UserCard class="mb-6" />


        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardBox is-form @submit.prevent="submitProfile">
            <FormField label="Avatar" help="Max 500kb">
              <FormFilePicker label="Upload" />
            </FormField>

            <FormField label="Name" help="Required. Your name">
              <FormControl
                v-model="username"
                :icon="mdiAccount"
                name="username"
                required
                autocomplete="username"
              />
            </FormField>
            <!-- <FormField label="E-mail" help="Required. Your e-mail">
              <FormControl
                v-model="profileForm.email"
                :icon="mdiMail"
                type="email"
                name="email"
                required
                autocomplete="email"
              />
            </FormField> -->

            <template #footer>
              <BaseButtons>
                <BaseButton color="info" type="submit" label="Submit" />
                <BaseButton color="info" label="Options" outline />
              </BaseButtons>
            </template>
          </CardBox>

          <CardBox is-form @submit.prevent="submitPass">
            <FormField label="Current password" help="Required. Your current password">
              <FormControl
                v-model="passwordForm.password_current"
                :icon="mdiAsterisk"
                name="password_current"
                type="password"
                required
                autocomplete="current-password"
              />
            </FormField>

            <BaseDivider />

            <FormField label="New password" help="Required. New password">
              <FormControl
                v-model="passwordForm.password"
                :icon="mdiFormTextboxPassword"
                name="password"
                type="password"
                required
                autocomplete="new-password"
              />
            </FormField>

            <FormField label="Confirm password" help="Required. New password one more time">
              <FormControl
                v-model="passwordForm.password_confirmation"
                :icon="mdiFormTextboxPassword"
                name="password_confirmation"
                type="password"
                required
                autocomplete="new-password"
              />
            </FormField>

            <template #footer>
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton color="info" label="Options" outline />
              </BaseButtons>
            </template>
          </CardBox>
        </div>
      </SectionMain>
    </NuxtLayout>
  </div>
</template>
