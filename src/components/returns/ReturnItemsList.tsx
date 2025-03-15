
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReturnItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  reason: string;
}

interface ReturnItemsListProps {
  items: ReturnItem[];
}

export function ReturnItemsList({ items }: ReturnItemsListProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Returned Items</h3>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.itemId}</div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>{item.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
