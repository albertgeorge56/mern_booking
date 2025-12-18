import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRegisterSchema } from '../schemas/user.schema'
import type { userRegisterSchemaType } from '../schemas/user.schema'
import { useMutation } from '@tanstack/react-query'
import * as authService from '../services/auth.service'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router'

export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<userRegisterSchemaType>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const mutation = useMutation({
        mutationFn: authService.register,
        onSuccess: (res) => {
            toast.success(res.data?.message)
            navigate('/')
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.error)
        },
    })

    const onSubmit = (data: userRegisterSchemaType) => {
        const { confirmPassword, ...dt } = data
        console.log(dt)
        mutation.mutate(dt)
    }

    return (
        <div className="container">
            <form
                className="max-w-2xl mx-auto"
                onSubmit={handleSubmit((data) => onSubmit(data))}
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Create an account
                </h1>
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <label className="font-semibold text-sm flex flex-col gap-2 w-full mb-2 cursor-pointer">
                        First Name
                        <input
                            className="border font-normal outline-0 rounded-4xl px-4 py-1.5 focus:outline-1 transition"
                            {...register('firstName')}
                        />
                        {errors.firstName && (
                            <span className="text-red-600">
                                {errors.firstName.message}
                            </span>
                        )}
                    </label>
                    <label className="font-semibold text-sm flex flex-col gap-2 w-full mb-2 cursor-pointer">
                        Last Name
                        <input
                            className="border font-normal outline-0 rounded-4xl px-4 py-1.5 focus:outline-1 transition"
                            {...register('lastName')}
                        />
                        {errors.lastName && (
                            <span className="text-red-600">
                                {errors.lastName.message}
                            </span>
                        )}
                    </label>
                </div>
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
                    <label className="font-semibold text-sm flex flex-col gap-2 w-full mb-2 cursor-pointer">
                        Confirm Password
                        <input
                            type="password"
                            className="border font-normal outline-0 rounded-4xl px-4 py-1.5 focus:outline-1 transition"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-600">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary cursor-pointer mt-4"
                >
                    Register
                </button>
                <p className="mt-2 font-semibold">
                    Don't Have Account?{' '}
                    <Link to="/login" className="underline underline-offset-4">
                        Login Now.
                    </Link>
                </p>
            </form>
        </div>
    )
}
