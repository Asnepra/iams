import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";

import { useTransition, useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import Cookies from 'js-cookie'
import toast from "react-hot-toast";
interface AssetFormProps{
  categoryData:{
    categoryId: number;
    categoryName: string;
  }[];
  subcategoryData:{
    subCategoryMasterId: number;
    subCategoryName: string;
    categoryMasterId: number;
  }[];
  assetData?:{
    assetModelId: number;
    manufacturerId: number;
    subcategoryId: number;
    assetModelName: string;
  }[];
  locationData?:{
    locationId: number;
    locationName: string;
  }[];
  manufacturerData?:{
    manufacturerId: number;
    manufacturerName: string;
  }[];
  osData?:{
    osMasterId: number;
    osMasterName: string;
  }[];
  processorData?:{
    processorMasterId: number;
    processorName:string;
  }[];
}
const ramGBOptions = [4, 8, 16, 32, 64,128,256,512]; // Example RAM options in GB provided by the client

const hddSddOptions = [256,512,1024,2048,4096,8192];// in GB
const monitorSizeInInchOptions = [17,19,21,23,25,29,31,35,41,45,49];// in GB

const assetSchema = z.object(
  {
    categoryMasterId: z.string().min(1, {
    message: "Required.",
  }),
  assetSerialNumber: z.string().min(2, {
    message: "Required Asset Serial Number.",
  }),
  subCategoryMasterId: z.string().min(1, {message: "Required.",}),
    manufacturerId: z.string().min(1, {message: "Required",}),
    locationId: z.string().min(1, {message: "Required.",}),
    osMasterId: z.string().optional(),
    assetModelId: z.string().min(1, {message: "Required",}),
    ramGBOptions: z.string().optional(),
    hddSddOptions: z.string().optional(),
    WarrantyStatus: z.boolean().default(false),
    monitorSizeInInchOptions: z.string().optional(),
    processorMasterId: z.string().optional(),
  }
)
const AssetForm = ({categoryData,subcategoryData,assetData,locationData, manufacturerData,
  osData, processorData
}:AssetFormProps) => {
  const token = Cookies.get('token');
  //console.log("data",categoryData);
  const [isPending, startTransition] = useTransition();
  const [filteredSubCategoryData, setFilteredSubCategoryData] = useState<{ subCategoryMasterId: number; subCategoryName: string }[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [filteredAssetData, setFilteredAssetData] = useState<{ assetModelId: number; manufacturerId:number; subcategoryId:number; assetModelName: string }[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null); 
  const [monitor, setMonitor] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | undefined>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Store the selected country ID
  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      assetSerialNumber:"",
      categoryMasterId:"",
      subCategoryMasterId:"",
      manufacturerId:"",
      locationId:"",
      osMasterId:"",
      ramGBOptions:"",
      hddSddOptions:"",
      monitorSizeInInchOptions:"",
      processorMasterId:"",
      WarrantyStatus:false,
    },
  });

  function onSubcategory(value:any){
    //console.log("subcategory", value);
    setSelectedSubCategory(value);
  const filteredAssetModel = assetData?.filter(assetData => assetData.subcategoryId === parseInt(value));
  setFilteredAssetData(filteredAssetModel || []);
  }
  function onManufacturer(value:any){
    //console.log("subcategory", value);
    setSelectedSubCategory(value);
  const filteredAssetModel1 = filteredAssetData?.filter(assetData => assetData.manufacturerId === parseInt(value));
  setFilteredAssetData(filteredAssetModel1 || []);
  }


  function onCategoryChange(value:any) {
  const filteredSubcategories = subcategoryData?.filter(subcategory => subcategory.categoryMasterId === parseInt(value));
  setFilteredSubCategoryData(filteredSubcategories || []);
  if(parseInt(value)===1 || parseInt(value) === 4){
    setSelectedCategory("1");
  }
  else{
    setSelectedCategory("0");
  }
  if(parseInt(value)===1 || parseInt(value) ===5){
    setMonitor("1");
  }else{
    setMonitor("0");
  }
  //if(categoryData.)
  }

  async function onSubmit(values: z.infer<typeof assetSchema>) {
    if(!values.hddSddOptions){
      console.log("no ssd")
    }
    //console.log("sdhb k")
    const data={
      
      assetModelId:values.assetModelId || "1234",
      pomasterId:"1",
      locationId:values.locationId ||"EKN Delhi Default Entry",
      belongsToUser:"2",
      hddCapacity:values.hddSddOptions || "-1",
      monitorSize:values.monitorSizeInInchOptions||"-1",
      ramGBOptions:values.ramGBOptions||"-1",
      processorMasterId:values.processorMasterId||"10000",
      osMasterId:values.osMasterId ||"10000",
      status:"1",
      purposeRemarks:"Single entry of Asset",
      purchaseDate:"01-01-2024",
      guaranteeStatus:values.WarrantyStatus||false,
      assetSerialNumber:values.assetSerialNumber ||0,
    }
    
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    

    console.log("data to send ------------  ",data);
    await axios.post(`/api/assetmaster`,data,config)
    .then(response => {
      toast.success("Data Added Successfully!")
      console.log("Success!", response);
      setTimeout(() => {
        window.location.reload();
      }, 3000); // 3000 milliseconds = 3 seconds
    }).catch(error => {console.log(error);});
    //console.log("subutmiited values:", data);
    setError("");
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <FormField
            control={form.control}
            name="assetSerialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Asset Serial Number</FormLabel>
                <FormControl>

                    <Input placeholder=" ISIO900 " {...field} />
                 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryMasterId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset List</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                     onCategoryChange(value); 
                    }
                  }
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        placeholder="Select a category..."
                        defaultValue={field.value || ""} // Set default value to an empty string
                      />
                      <SelectContent>
                        {categoryData?.map((category) => (
                          <SelectItem
                            key={category.categoryId}
                            value={category.categoryId.toString()}
                          >
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategoryMasterId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onSubcategory(value);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        placeholder="Select a sub-category..."
                        defaultValue={field.value || ""} // Set default value to an empty string
                      />
                      <SelectContent>
                        {filteredSubCategoryData?.map((category) => (
                          <SelectItem
                            key={category.subCategoryMasterId}
                            value={category.subCategoryMasterId.toString()}
                          >
                            {category.subCategoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manufacturerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onManufacturer(value);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        placeholder="Select a Manufacturer..."
                        defaultValue={field.value || ""} // Set default value to an empty string
                      />
                      <SelectContent>
                        {manufacturerData?.map((category) => (
                          <SelectItem
                            key={category.manufacturerId}
                            value={category.manufacturerId.toString()}
                          >
                            {category.manufacturerName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        placeholder="Select a Location..."
                        defaultValue={field.value || ""} // Set default value to an empty string
                      />
                      <SelectContent>
                        {locationData?.map((category) => (
                          <SelectItem
                            key={category.locationId}
                            value={category.locationId.toString()}
                          >
                            {category.locationName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedCategory ==="1" ? (
            <>
              <FormField
                control={form.control}
                name="osMasterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operating System</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="Select an operating system..."
                            defaultValue={field.value || ""} 
                          />
                          <SelectContent>
                            {osData?.map((os) => (
                              <SelectItem
                                key={os.osMasterId}
                                value={os.osMasterId.toString()}
                              >
                                {os.osMasterName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="processorMasterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Processor</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="Select a processor..."
                            defaultValue={field.value || ""} 
                          />
                          <SelectContent>
                            {processorData?.map((processor) => (
                              <SelectItem
                                key={processor.processorMasterId}
                                value={processor.processorMasterId.toString()}
                              >
                                {processor.processorName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ramGBOptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ram Size (GB)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="Select Ram Size (GB)..."
                            defaultValue={field.value || ""} 
                          />
                          <SelectContent>
                            {ramGBOptions?.map((processor) => (
                              <SelectItem
                                key={processor}
                                value={processor.toString()}
                              >
                                {processor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hddSddOptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hdd or SSD Size (GB)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="Select a Szie (GB)..."
                            defaultValue={field.value || ""} 
                          />
                          <SelectContent>
                            {hddSddOptions?.map((processor) => (
                              <SelectItem
                                key={processor}
                                value={processor.toString()}
                              >
                                {processor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : null}

          {monitor==="1"?(<FormField
                control={form.control}
                name="monitorSizeInInchOptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monitor Size (inch)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="Select a Size (inch)..."
                            defaultValue={field.value || ""} 
                          />
                          <SelectContent>
                            {monitorSizeInInchOptions?.map((processor) => (
                              <SelectItem
                                key={processor}
                                value={processor.toString()}
                              >
                                {processor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />):null}


          <FormField
                control={form.control}
                name="assetModelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Model</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="Select an asset Model..."
                            defaultValue={field.value || ""} 
                          />
                          <SelectContent>
                            {filteredAssetData?.map((processor) => (
                              <SelectItem
                                key={processor.assetModelId}
                                value={processor.assetModelId.toString()}
                              >
                                {processor.assetModelName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="WarrantyStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WarrantyStatus</FormLabel>
                    <FormControl>
                      <div className="py-2 flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label>Check if Asset is in Warranty</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          Add Asset
        </Button>
      </form>
    </Form>
  );
};

export default AssetForm;
