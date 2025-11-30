import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userLoginSchema } from '../schemas/user.schema'
import type { userLoginSchemaType } from '../schemas/user.schema'
import { useNavigate } from 'react-router'
import { useAppContext } from '@/contexts/AppContext'

export default function Login() {
    const { login } = useAppContext()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<userLoginSchemaType>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: userLoginSchemaType) => {
        login(data).then(() => navigate('/'))
    }

    return (
        <div className="container">
            <form
                className="max-w-2xl mx-auto"
                onSubmit={handleSubmit((data) => onSubmit(data))}
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Login to Account
                </h1>
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <label className="font-semibold text-sm flex flex-col gap-2 w-full mb-2 cursor-pointer">
                        Email
                        <input
                            type="email"
                            className="border font-normal outline-0 rounded-4xl px-4 py-1.5 focus:outline-1 transition"
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className="text-red-600">
                                {errors.email.message}
                            </span>
                        )}
                    </label>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <label className="font-semibold text-sm flex flex-col gap-2 w-full mb-2 cursor-pointer">
                        Password
                        <input
                            type="password"
                            className="border font-normal outline-0 rounded-4xl px-4 py-1.5 focus:outline-1 transition"
                            {...register('password')}
                        />
                        {errors.password && (
                            <span className="text-red-600">
                                {errors.password.message}
                            </span>
                        )}
                    </label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary cursor-pointer mt-4"
                >
                    Login
                </button>
            </form>
        </div>
    )
}
