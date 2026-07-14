import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/home";
import WhoWeAre from "@/pages/who-we-are";
import WhatWeDo from "@/pages/what-we-do";
import ImpactReports from "@/pages/impact-reports";
import Stories from "@/pages/stories";
import StoryDetail from "@/pages/story-detail";
import GetInvolved from "@/pages/get-involved";
import Opportunities from "@/pages/opportunities";
import Positions from "@/pages/positions";
import Partner from "@/pages/partner";
import Summit from "@/pages/summit";
import Legal from "@/pages/legal";
import Donate from "@/pages/donate";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/who-we-are" component={WhoWeAre} />
        <Route path="/what-we-do" component={WhatWeDo} />
        <Route path="/impact-reports" component={ImpactReports} />
        <Route path="/stories" component={Stories} />
        <Route path="/stories/:id" component={StoryDetail} />
        <Route path="/get-involved" component={GetInvolved} />
        <Route path="/get-involved/opportunities" component={Opportunities} />
        <Route path="/get-involved/positions" component={Positions} />
        <Route path="/get-involved/partner" component={Partner} />
        <Route path="/summit" component={Summit} />
        <Route path="/privacy" component={() => <Legal type="privacy" />} />
        <Route path="/terms" component={() => <Legal type="terms" />} />
        <Route path="/accessibility" component={() => <Legal type="accessibility" />} />
        <Route path="/donate" component={Donate} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
