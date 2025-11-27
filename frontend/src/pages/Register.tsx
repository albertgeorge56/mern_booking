import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRegisterSchema } from '../schemas/user.schema'
import type { userRegisterSchemaType } from '../schemas/user.schema'

export default function Register() {
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

    return (
        <div className="container">
            <form
                className="max-w-2xl mx-auto"
                onSubmit={handleSubmit(
                    (data) => {
                        console.log(data)
                    },
                    (errors) => console.log(errors)
                )}
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
            </form>
        </div>
    )
}
