import Logo from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FORGETPASSWORD } from "@/graphql/mutations/userMutation"
import { useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const formSchema = z.object({
    email: z.string().email(),
})

const ForgetPassword = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
     const [forgetPassword,{loading}] = useMutation(FORGETPASSWORD)
   async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
          await forgetPassword({
            variables:{input:{
                email:values.email
            }}
          })
          toast.success("A Reset Password link has been sent to your email")
        }catch(error){
          if(error instanceof Error){
            toast.error(error.message)
          }else{
            toast.error("unexpected error")
          }
        }
    }
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-backgroundGrey px-10">
            <Logo />
            <h4 className="text-[32px] font-bold text-black">
                Forget Your Password
            </h4>
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
                    <Button type="submit" className="w-full bg-primaryBlue hover:bg-primaryBlue" disabled={loading}>
                      {
                        loading ? "Loading..." :"Send Reset Password Link"
                      }
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ForgetPassword