
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Plus, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface CreateReturnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateReturnDialog({ open, onOpenChange }: CreateReturnDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const form = useForm({
    defaultValues: {
      orderId: "",
      reason: "",
      items: [],
      customerNotes: ""
    }
  });
  
  const searchOrder = () => {
    const orderId = form.getValues("orderId");
    if (!orderId) {
      form.setError("orderId", { 
        type: "required", 
        message: "Please enter an order ID" 
      });
      return;
    }
    
    // Simulate API call to fetch order
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // Mock order data
      setOrderDetails({
        id: orderId,
        date: "2023-05-15",
        customer: {
          name: "John Smith",
          email: "john.smith@example.com"
        },
        items: [
          { id: "ITEM001", name: "Wireless Headphones", quantity: 1, price: 79.99 },
          { id: "ITEM002", name: "Bluetooth Speaker", quantity: 1, price: 49.99 }
        ]
      });
      setStep(2);
    }, 1000);
  };
  
  const createReturn = (data: any) => {
    setSubmitting(true);
    // Simulate API call to create return
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Return Created",
        description: `Return for order ${data.orderId} has been created successfully.`
      });
      // Reset form and close dialog
      form.reset();
      setStep(1);
      setOrderDetails(null);
      onOpenChange(false);
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Create New Return
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Enter the order ID to begin processing a return" 
              : "Complete the return details to create the RMA"}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          {step === 1 ? (
            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Enter order ID" {...field} />
                      </FormControl>
                      <Button 
                        type="button" 
                        onClick={searchOrder}
                        disabled={submitting}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        {submitting ? "Searching..." : "Search"}
                      </Button>
                    </div>
                    <FormDescription>
                      Enter the order ID to locate the order for return
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(createReturn)} className="space-y-4 py-4">
              <div className="bg-muted rounded-md p-3 mb-4">
                <h3 className="font-medium text-sm mb-2">Order Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order ID:</span> 
                    <span className="font-medium ml-1">{orderDetails.id}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span> 
                    <span className="font-medium ml-1">{orderDetails.date}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Customer:</span> 
                    <span className="font-medium ml-1">{orderDetails.customer.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span> 
                    <span className="font-medium ml-1">{orderDetails.customer.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Items for Return</h3>
                {orderDetails.items.map((item: any, index: number) => (
                  <div key={item.id} className="flex items-center gap-2 p-3 border rounded-md">
                    <input 
                      type="checkbox" 
                      id={`item-${item.id}`}
                      className="h-4 w-4"
                    />
                    <label htmlFor={`item-${item.id}`} className="flex-1">
                      <div>{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Qty: {item.quantity} • ${item.price.toFixed(2)}
                      </div>
                    </label>
                    <Select defaultValue="defective">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Return reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defective">Defective</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                        <SelectItem value="wrong_item">Wrong Item</SelectItem>
                        <SelectItem value="not_needed">No Longer Needed</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Reason</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary reason for return" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="defective">Product is defective</SelectItem>
                        <SelectItem value="damaged">Product arrived damaged</SelectItem>
                        <SelectItem value="wrong_item">Received wrong item</SelectItem>
                        <SelectItem value="not_as_described">Not as described</SelectItem>
                        <SelectItem value="unwanted">No longer wanted</SelectItem>
                        <SelectItem value="other">Other reason</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional details about this return"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide any additional information about this return
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setStep(1);
                    setOrderDetails(null);
                  }}
                >
                  Back
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Return"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
