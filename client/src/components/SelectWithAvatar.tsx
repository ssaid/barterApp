import {Select, SelectItem } from "@nextui-org/react";

type Items = {
  value: string
  label: string
}

type SelectWithAvatarProps = {
  label: string
  items: Items[]
}

export const SelectWithFilter = ({ label, items }: SelectWithAvatarProps) => {

  
  return (
    <Select 
      items={items}
      variant="bordered"
      label={label}
      name="country" 
      // classNames={{
      //   label: "group-data-[filled=true]:-translate-y-5",
      //   trigger: "min-h-unit-16",
      //   listboxWrapper: "max-h-[400px]",
      // }}
      // listboxProps={{
      //   itemClasses: {
      //     base: [
      //       "rounded-md",
      //       "text-default-500",
      //       "transition-opacity",
      //       "data-[hover=true]:text-foreground",
      //       "data-[hover=true]:bg-default-100",
      //       "dark:data-[hover=true]:bg-default-50",
      //       "data-[selectable=true]:focus:bg-default-50",
      //       "data-[pressed=true]:opacity-70",
      //       "data-[focus-visible=true]:ring-default-500",
      //     ],
      //   },
      // }}
      // popoverProps={{
      //   classNames: {
      //     base: "p-0 border-small border-divider bg-background",
      //     arrow: "bg-default-200",
      //   },
      // }}
      listboxProps={{
        onInput: (e) => {
          console.log(e)
        }
      }}
      renderValue={items => {
        return (
          <div>
            {
              items.map( item => (
                <div key={item.key} className="flex items-center gap-2">
                  <span>{item.data.label}</span>
                </div>
              ))
            }
          </div>
        )
      }}
    >
      {
        item =>
          <SelectItem 
            key={item.value} 
            value={item.value} 
          >
            { item.label }
          </SelectItem>
      }
    </Select>
  );
}
