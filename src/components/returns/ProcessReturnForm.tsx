
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PackageCheck } from "lucide-react";
import { useForm } from "react-hook-form";

interface ProcessReturnFormProps {
  onComplete: () => void;
}

export function ProcessReturnForm({ onComplete }: ProcessReturnFormProps) {
  const [updating, setUpdating] = useState(false);
  
  const form = useForm({
    defaultValues: {
      condition: "good",
      restock: true,
      refundAmount: "100",
      notes: ""
    }
  });
  
  const handleSubmit = (data: any) => {
    setUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setUpdating(false);
      onComplete();
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <PackageCheck size={18} className="text-primary" />
          Process Return
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Condition</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Like New</SelectItem>
                      <SelectItem value="good">Good - Minor Issues</SelectItem>
                      <SelectItem value="damaged">Damaged - As Described</SelectItem>
                      <SelectItem value="unusable">Unusable - Severely Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Assess the condition of the returned item
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="restock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Restock Item</FormLabel>
                    <FormDescription>
                      Add this item back to inventory for resale
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="refundAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refund Percentage</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select refund amount" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="100">100% - Full Refund</SelectItem>
                      <SelectItem value="75">75% - Partial Refund</SelectItem>
                      <SelectItem value="50">50% - Partial Refund</SelectItem>
                      <SelectItem value="0">0% - No Refund</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the percentage of the purchase price to refund
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add notes about this return"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add any additional details about processing this return
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={updating}>
              {updating ? "Processing..." : "Complete Return & Process Refund"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
