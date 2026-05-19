import Image from "next/image";
import styles from "./page.module.css"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope ,Check } from "lucide-react";
import Link from "next/link";
import banner2 from "@/public/banner2.png";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import Pricing from "@/components/pricing";
import { TriageButton } from "@/components/triage-button";
import TriageChat from "@/components/triage-chat";



export default function Home() {
  return (
    <>
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 text-emerald-400 text-sm font-medium">
              Healthcare made simple 
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"> Connect with doctors <br/>
          <span className="gradient-title"> anytime, anywhere</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md"> Book appointments , consult via video , and manage your healthcare journey all in one secure platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button
            asChild
            size="lg"
            className="bg-emerald-600 text-white hover:bg-emerald-700">
              <Link href={"/onboarding"}>
            Get Started 
            <ArrowRight className="ml-2 h-4 w-4"/>
            </Link>
            </Button>
            <Button
            asChild
            size="lg"
            className="border-emerald-700/30 hover:bg-muted/80">
              <Link href={"/doctors"}>
             Find Doctors 
            <ArrowRight className="ml-2 h-4 w-4"/>
            </Link>
            </Button>
              </div>  
            </div>
            <div className="relative h-[500px] lg:h-[500px] ">
              <Image src ={banner2}
               alt="Doctor consultation"
               fill
               priority
               className="object-contain md:pt-14 rounded-xl"
               />
            </div>
          </div>
        </div> 
      </section>

      {/* AI Triage Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 text-center relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-950 dark:text-emerald-50">
            Not sure which doctor you need?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Describe your symptoms and get matched to the right specialist in seconds.
          </p>
          <TriageButton />
        </div>
      </section>
    
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bond text-white mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our platform makes healthcare accessible with just a few clicks</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature,index) => {
          return(
            <Card key={index}
            className="border-x-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
            >
              <CardHeader>
                <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">{feature.icon}</div>
               <CardTitle>
                {feature.title}
               </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}</div>
      </div>
    </section>

        <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4">Affordable Healthcare</Badge>
          <h2 className="text-3xl md:text-4xl font-bond text-white mb-4">
            Consultation Packages
            </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect consultation package that fits your healthcare needs
            </p>
        </div>

        <div>
        {/* Pricing Table */}
         <Pricing/>
        <Card className = "mt-12 bg-muted/20 border-emerald-900/30">
        <CardHeader>
        <CardTitle className = "text-xl font-semibold text-whote flex items-center">
          <Stethoscope className="h-5 w-5 mr-2 text-emerald-400"/>
          How Our Credit System Works</CardTitle>
        </CardHeader>
        <CardContent>
         <ul className="space-y-3">   {creditBenefits.map((benefit,index)=>{
         return(
          <li key={index} className="flex items-start">
            <div>
              <Check className = "h-4 w-4 text-emerald-400" />
              <p 
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{__html:benefit}} />
            </div>
          </li>
         )})}</ul>
         
          </CardContent>
        </Card>
        </div>
      </div>
    </section>
     <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge
           variant="variant" 
          className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4">Success Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bond text-white mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Hear from patients and doctor who use our platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonials,index) => {
          return(
            <Card 
            key={index}
            className="border-x-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
            >
              
              <CardContent className="pt-6">
               <div className="flex item-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                
                 <span className="text-emerald-400 font-bold">
                  {testimonials.initials}
                  </span> 
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonials.name}</h4>
                  <p>{testimonials.role}</p>
                </div>
                </div> 
                <p className="text-muted-foreground">
                  &quot;{testimonials.quote}&quot;
                </p>
              </CardContent>
            </Card>
          );
        })}</div>
      </div>
    </section>

     {/* CTA Section with green medical styling */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to take control of your healthcare?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of users who have simplified their healthcare
                  journey with our platform. Get started today and experience
                  healthcare the way it should be.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Link href="/sign-up">Sign Up Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-emerald-700/30 hover:bg-muted/80"
                  >
                    <Link href="#pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>

              {/* Decorative healthcare elements */}
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-emerald-800/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-emerald-700/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
            </CardContent>
          </Card>
        </div>
      </section>


    </div>  
      <TriageChat />
    </>
  );
}
