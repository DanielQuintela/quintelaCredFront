

type UserFormData = {
  name: string
  email: string
  password?: string

  role: 'ADMIN' | 'USER'
  status: 'ACTIVE' | 'INACTIVE'
}

interface Props {
  defaultValues?: Partial<UserFormData>

  isEdit?: boolean

  onSubmit: (
    data: UserFormData
  ) => Promise<void>
}

