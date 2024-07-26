import loginImage from '@/assets/images/loginImage1.png'
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import googleLogog from "@/assets/images/GoogleLogo (1).png";
import { useMutation } from '@apollo/client'
import { LOGIN } from '@/graphql/mutations/userMutation'
import { toast } from 'sonner'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Please Your password must be at 6 characters")
})


const LoginPage = () => {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const [login, { loading }] = useMutation(LOGIN,{
        refetchQueries:["AuthUser"]
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await login({
                variables: {
                    input: {
                        email: values.email,
                        password: values.password
                    }
                }
            })
            toast.success("Login Successfully!")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    }

    const HandleGoogle = async () => {
        try {
            window.location.href = "http://localhost:4000/auth/google"
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Unexpected error")
            }
        }
    }
    return (<div className="flex flex-col md:flex-row w-full h-full font-inter">
        {/**Signup form */}
        <div className="bg-backgroundGrey w-full md:w-[65%] min-h-screen flex flex-col justify-center items-center px-5 py-16">
            {/*form header */}
            <Logo />
            <h4 className="text-[32px] font-bold text-black">
                Sign In to Event Hive
            </h4>
            {/**form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full sm:w-[400px] md:w-[450px]  mt-10">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" uppercase text-[14px] font-normal">Your Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email " {...field}
                                        className=" placeholder:text-[#687C94] text-black w-full py-4" />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" uppercase text-[14px] font-normal w-full flex justify-between">
                                    <span>
                                        Password
                                    </span>
                                    <span className=' capitalize text-grey600 cursor-pointer hover:border-b-[1px] hover:border-grey600'>
                                        <Link to="/forgetPassword">
                                            Forget Password?
                                        </Link>
                                    </span>

                                </FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field}
                                        className=" placeholder:text-[#687C94] text-black w-full py-4" />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button type="submit" className="w-full md:w-[260px] bg-primaryBlue hover:bg-primaryBlue" disabled={loading}>
                            {
                                loading ? "Loading..." : " Sign in"
                            }
                        </Button>
                    </div>
                </form>
            </Form>
            {/**Google button */}
            <p className="text-[16px] text-grey600 text-center  py-5">Or</p>

            <div className="w-full flex justify-center">
                <Button variant="outline" className="flex gap-2 w-full sm:w-[360px]" onClick={HandleGoogle}>
                    <img src={googleLogog} />
                    Sign in in google
                </Button>
            </div>
        </div>
        {/**image at the left */}
        <div className="w-full md:w-[35%] min-h-screen f relative hidden md:flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}>
            <div className="w-full flex  flex-col justify-center items-center">
                <h6 className="text-[28px] lg:text-[36px] text-white font-bold text-center">Hello Friend</h6>
                <p className="text-[12px] max-lg:px-5 lg:text-[16px] font-normal text-white text-center">
                    To keep connected with us provide us with your information
                </p>
                <Button onClick={() => navigate("/signup")}
                    className="text-white bg-grey600/45 hover:bg-grey600 w-fit mt-5">
                    Sign up
                </Button>
            </div>
        </div>
    </div>

    )
}

export default LoginPage