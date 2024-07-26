import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
    Data:{
        name:string,
        value:string
    }[],
    onChange:(value:string)=>void,
    value:string,
    placeHolder:string
}

const SelectBox = ({Data,onChange,value,placeHolder}:Props) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full focus:border-none focus-visible:border-none">
                <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent>
                {
                    Data.map((item,index)=>(
                    <SelectItem value={item.value} key={index}>
                        {item.name}
                    </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>

    )
}

export default SelectBox