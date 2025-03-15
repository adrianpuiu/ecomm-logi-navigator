
import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { CustomerSegmentFilter } from "@/components/customers/CustomerSegmentFilter";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Customers | Logistics TMS</title>
      </Helmet>
      
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customers and view their order history
          </p>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                A list of all your customers
              </CardDescription>
            </div>
            <Button onClick={() => navigate("/customers/new")}>
              Add Customer
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <CustomerSegmentFilter 
                selectedSegment={selectedSegment} 
                onSegmentChange={setSelectedSegment} 
              />
            </div>
            <CustomerTable searchTerm={searchTerm} selectedSegment={selectedSegment} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
