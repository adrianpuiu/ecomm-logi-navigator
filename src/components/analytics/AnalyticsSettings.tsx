
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail, Save } from "lucide-react";

export function AnalyticsSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Settings</CardTitle>
        <CardDescription>Configure your analytics preferences and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="data">Data Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Dashboard Configuration</h3>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <Label className="font-medium">Auto-refresh Dashboard</Label>
                    <p className="text-sm text-muted-foreground">Automatically reload dashboard data</p>
                  </div>
                  <Switch id="auto-refresh" />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <Label className="font-medium">Default Time Period</Label>
                    <p className="text-sm text-muted-foreground">Set the default time range for analytics</p>
                  </div>
                  <Select defaultValue="30days">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">Last 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <Label className="font-medium">Show Goal Targets</Label>
                    <p className="text-sm text-muted-foreground">Display target lines on performance charts</p>
                  </div>
                  <Switch id="show-targets" defaultChecked />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <Label className="font-medium">Widget Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable chart animations</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div>
                    <Label className="font-medium">Dashboard Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose the color theme for charts</p>
                  </div>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System Default</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Report & Alert Notifications</h3>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <Bell size={16} />
                    </div>
                    <div>
                      <Label className="font-medium">KPI Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when KPIs fall below targets</p>
                    </div>
                  </div>
                  <Switch id="kpi-alerts" defaultChecked />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                      <Mail size={16} />
                    </div>
                    <div>
                      <Label className="font-medium">Scheduled Reports</Label>
                      <p className="text-sm text-muted-foreground">Receive scheduled reports via email</p>
                    </div>
                  </div>
                  <Switch id="scheduled-reports" defaultChecked />
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="email-recipients">Email Recipients</Label>
                  <Input id="email-recipients" placeholder="Enter email addresses" defaultValue="operations@example.com, manager@example.com" />
                  <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label>Alert Thresholds</Label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="on-time-threshold" className="text-sm">On-Time Delivery</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="on-time-threshold" type="number" defaultValue="90" className="w-20" />
                        <span className="text-sm">%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cost-per-shipment" className="text-sm">Cost per Shipment</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="cost-per-shipment" type="number" defaultValue="30" className="w-20" />
                        <span className="text-sm">$</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="return-rate" className="text-sm">Return Rate</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="return-rate" type="number" defaultValue="5" className="w-20" />
                        <span className="text-sm">%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="transit-time" className="text-sm">Transit Time</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="transit-time" type="number" defaultValue="3" className="w-20" />
                        <span className="text-sm">days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Source Configuration</h3>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <Label className="font-medium">Carrier API Integration</Label>
                    <p className="text-sm text-muted-foreground">Pull performance data from carrier APIs</p>
                  </div>
                  <Switch id="carrier-api" defaultChecked />
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <Label className="font-medium">Historical Data Retention</Label>
                    <p className="text-sm text-muted-foreground">Set how long to keep historical analytics data</p>
                  </div>
                  <Select defaultValue="1year">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 months</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="2years">2 years</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <Label className="font-medium">Data Refresh Frequency</Label>
                    <p className="text-sm text-muted-foreground">How often to update analytics data</p>
                  </div>
                  <Select defaultValue="hourly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label>Custom Data Sources</Label>
                  <p className="text-sm text-muted-foreground mb-2">Add external data sources for enhanced analytics</p>
                  
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-name">API Name</Label>
                      <Input id="api-name" placeholder="E.g., ERP System" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-endpoint">API Endpoint</Label>
                      <Input id="api-endpoint" placeholder="https://api.example.com/data" />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="api-key">API Key</Label>
                        <Input id="api-key" type="password" placeholder="Enter API key" />
                      </div>
                      
                      <div className="space-y-2 flex-1">
                        <Label htmlFor="refresh-interval">Refresh Interval</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="refresh-interval">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button variant="secondary" className="w-full">+ Add Data Source</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Data Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
