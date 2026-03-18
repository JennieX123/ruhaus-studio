import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import GalaxsyncDetail from "@/pages/GalaxsyncDetail";
import SomaDetail from "@/pages/SomaDetail";
import HearMeDetail from "@/pages/HearMeDetail";
import YoyoDetail from "@/pages/YoyoDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/galaxsync" component={GalaxsyncDetail}/>
      <Route path="/soma" component={SomaDetail}/>
      <Route path="/hear-me" component={HearMeDetail}/>
      <Route path="/yoyo" component={YoyoDetail}/>
      <Route path="/:slug" component={ProjectDetail}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;