import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Plus, Search, LayoutGrid, List, Filter, FileText, 
  Clock, Briefcase, CheckCircle2, Download, PhoneCall,
  HelpCircle, Menu
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardSidebar from "@/components/DashboardSidebar";
import QuoteCard from "@/components/dashboard/QuoteCard";
import QuoteDetailModal from "@/components/dashboard/QuoteDetailModal";
import { MOCK_QUOTES, DASHBOARD_STATS, Quote, QuoteStatus } from "@/data/quotes-mock";
import { COMPANY_INFO, ROUTES, SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TabValue = 'all' | QuoteStatus;

const TABS: { value: TabValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_review', label: 'In Review' },
  { value: 'quote_sent', label: 'Quote Sent' },
  { value: 'approved', label: 'Approved' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

const DashboardQuotes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'amount'>('date');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredQuotes = useMemo(() => {
    let result = [...MOCK_QUOTES];

    // Filter by tab/status
    if (activeTab !== 'all') {
      result = result.filter(q => q.status === activeTab);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(q => 
        q.id.toLowerCase().includes(query) ||
        q.propertyAddress.street.toLowerCase().includes(query) ||
        q.propertyAddress.city.toLowerCase().includes(query) ||
        q.serviceType.toLowerCase().includes(query)
      );
    }

    // Filter by service
    if (serviceFilter !== 'all') {
      result = result.filter(q => q.serviceType === serviceFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        case 'status':
          return a.status.localeCompare(b.status);
        case 'amount':
          const aVal = a.estimatedValue?.max || 0;
          const bVal = b.estimatedValue?.max || 0;
          return bVal - aVal;
        default:
          return 0;
      }
    });

    return result;
  }, [activeTab, searchQuery, serviceFilter, sortBy]);

  const handleViewDetails = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsDetailOpen(true);
  };

  const getTabCount = (status: TabValue) => {
    if (status === 'all') return MOCK_QUOTES.length;
    return MOCK_QUOTES.filter(q => q.status === status).length;
  };

  return (
    <>
      <Helmet>
        <title>My Quotes | {COMPANY_INFO.name} Dashboard</title>
        <meta name="description" content="Manage your quote requests, track project progress, and communicate with the Rhino Construction team." />
      </Helmet>

      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem="quotes"
          onItemClick={() => {}}
        />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-background border-b">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">My Quotes</h1>
                  <p className="text-sm text-muted-foreground">Manage your quote requests and projects</p>
                </div>
              </div>
              <Button asChild>
                <Link to={ROUTES.REQUEST_QUOTE}>
                  <Plus className="mr-2 h-4 w-4" />
                  Request New Quote
                </Link>
              </Button>
            </div>

            {/* Tabs */}
            <div className="px-6 pb-0 overflow-x-auto">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
                <TabsList className="h-12 bg-transparent gap-1">
                  {TABS.map((tab) => {
                    const count = getTabCount(tab.value);
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        {tab.label}
                        {count > 0 && (
                          <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                            {count}
                          </Badge>
                        )}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            </div>
          </header>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{DASHBOARD_STATS.activeQuotes}</div>
                        <div className="text-sm text-muted-foreground">Active Quotes</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-accent text-accent-foreground">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{DASHBOARD_STATS.pendingResponse}</div>
                        <div className="text-sm text-muted-foreground">Pending Response</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{DASHBOARD_STATS.projectsInProgress}</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/20 text-primary">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{DASHBOARD_STATS.lifetimeProjects}</div>
                        <div className="text-sm text-muted-foreground">Lifetime Projects</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-1 gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID or address..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Service Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      {SERVICES.map((service) => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'card' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('card')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('table')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quotes List */}
              {filteredQuotes.length === 0 ? (
                <Card className="p-12">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {searchQuery || serviceFilter !== 'all' || activeTab !== 'all'
                        ? "No quotes found"
                        : "You haven't requested any quotes yet"
                      }
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      {searchQuery || serviceFilter !== 'all' || activeTab !== 'all'
                        ? "Try adjusting your filters or search query."
                        : "Get started by requesting a free quote for your home improvement project."
                      }
                    </p>
                    {!searchQuery && serviceFilter === 'all' && activeTab === 'all' && (
                      <>
                        <Button asChild size="lg">
                          <Link to={ROUTES.REQUEST_QUOTE}>
                            <Plus className="mr-2 h-5 w-5" />
                            Request Your First Quote
                          </Link>
                        </Button>
                        <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="font-medium mb-1">1. Submit Request</div>
                            <p className="text-sm text-muted-foreground">Tell us about your project with photos</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="font-medium mb-1">2. Get Quote</div>
                            <p className="text-sm text-muted-foreground">Receive a detailed estimate</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="font-medium mb-1">3. Start Project</div>
                            <p className="text-sm text-muted-foreground">Approve and we'll get started</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ) : viewMode === 'card' ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredQuotes.map((quote) => (
                    <QuoteCard 
                      key={quote.id} 
                      quote={quote} 
                      onViewDetails={handleViewDetails}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-4 font-medium">Quote</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Property</th>
                          <th className="text-left p-4 font-medium">Submitted</th>
                          <th className="text-left p-4 font-medium">Est. Value</th>
                          <th className="text-left p-4 font-medium">Updated</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredQuotes.map((quote) => (
                          <QuoteCard 
                            key={quote.id} 
                            quote={quote} 
                            onViewDetails={handleViewDetails}
                            viewMode={viewMode}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                      <Link to={ROUTES.REQUEST_QUOTE}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Quote
                      </Link>
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download All Quotes
                    </Button>
                    <Button variant="outline">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/faq">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        FAQ
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
        </main>
      </div>

      <QuoteDetailModal 
        quote={selectedQuote}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
};

export default DashboardQuotes;
