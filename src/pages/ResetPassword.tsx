import { Link,useParams } from "react-router-dom";
import Logo from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@apollo/client";
import { RESETPASSWORD } from "@/graphql/mutations/userMutation";
import { toast } from "sonner";

const formSchema = z.object({
    password: z.string().min(6,"Your Password must be at least 6 characters"),
    confirmPassword:z.string()
}).refine(data=> data.password === data.confirmPassword,{
    message:"Password must match",
    path:["confirmPassword"]
})


const ResetPassword = () => {
    const {resetToken} = useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password:"",
            confirmPassword:""
        },
    })
    const [resetPassword,{loading}] = useMutation(RESETPASSWORD)
   async function onSubmit(values: z.infer<typeof formSchema>) {
         try{
            await resetPassword({
                variables:{input:{
                    token:resetToken,
                    newPassword:values.password
                }}
            })
            toast.success("Password Reset,try logging in")
         }catch(error){
           if(error instanceof Error){
             toast.error(error.message)
           }else{
             toast.error("Unexpected Error")
           }
         }
    }
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-backgroundGrey px-10">
            <Logo />
            <h4 className="text-[32px] font-bold text-black">
                Reset Your Password
            </h4>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full sm:w-[400px] md:w-[450px]  mt-10">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" uppercase text-[14px] font-normal">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password " {...field}
                                        className=" placeholder:text-[#687C94] text-black w-full py-4" />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" uppercase text-[14px] font-normal">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password " {...field}
                                        className=" placeholder:text-[#687C94] text-black w-full py-4" />
                                </FormControl>
                                <FormMessage className="text-[12px]" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-primaryBlue hover:bg-primaryBlue" disabled={loading}>
                      {
                        loading ? "Reseting Password" : "Reset Password"
                      }
                    </Button>
                </form>
            </Form>
              <p className="text-grey600 font-semibold py-5">
                <Link to="/login">
                Return to login Page
                </Link>
              </p>
        </div>
    )
}

export default ResetPassword