import { UserInfoType } from "@/pages/ProfilePage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, 
    FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import SelectBox from "./SelectBox"
import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "@/graphql/mutations/userMutation"
import { toast } from "sonner"

type Props = {
    userInfo: UserInfoType
}
const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    gender: z.string().optional()
})
const genderData = [
    {name:"male",value:"male"},
    {name:"female",value:"female"}
]
const ProfileForm = ({ userInfo }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userInfo
    })
     const [updateuser,{loading:updating}] = useMutation(UPDATE_USER)
   async function onSubmit(values: z.infer<typeof formSchema>) {
       try{
        await updateuser({
            variables:{input:{
                name:values.name,
                gender:values.gender,
                phoneNumber:values.phoneNumber
            }}
        })
        toast.success("Profile Updated")
       }catch(error){
        if(error instanceof Error){
            toast.error(error.message)
        }else{
            toast.error("Unexpected error")
        }
       }
    }
    return (
        <div className=" w-full flex gap-8 lg:w-[80%] mt-8">
            <div>
                <img src={userInfo.profilePicture} className="w-[110px] h-[110px] md:w-[250px] md:h-[250px] rounded-full" />
            </div>
            <div className="w-full h-full flex-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} disabled />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter your name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter your phone number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <SelectBox placeHolder="Choose gender" 
                                        Data={genderData} value={field.value || ""} onChange={field.onChange}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        
                        <Button type="submit" className="w-full bg-primaryBlue hover:bg-primaryBlue text-white hover:text-white" disabled={updating}>
                          {updating ? "updating":" Update"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ProfileForm