import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import { AlertCircle, ClipboardCheck, XCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VerificationPage = async () => {
  const user = await getCurrentUser();

  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  const isRejected = user?.verificationStatus === "REJECTED";

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-2xl w-full">
        <Card className="border-emerald-900/20">
          <CardHeader className="text-center">
            <div
              className={`mx-auto p-4 rounded-full mb-4 w-fit ${
                isRejected ? "bg-red-900/20" : "bg-amber-900/20"
              }`}
            >
              {isRejected ? (
                <XCircle className="h-8 w-8 text-red-400" />
              ) : (
                <ClipboardCheck className="h-8 w-8 text-amber-400" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {isRejected ? "Verification Declined" : "Verification in Progress"}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg mt-2">
              {isRejected
                ? "Unfortunately, your application needs revision"
                : "Thank you for submitting your information"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div
              className={`rounded-lg p-4 mb-6 flex items-start ${
                isRejected
                  ? "bg-red-900/10 border border-red-900/20"
                  : "bg-amber-900/10 border border-amber-900/20"
              }`}
            >
              <AlertCircle
                className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${
                  isRejected ? "text-red-400" : "text-amber-400"
                }`}
              />
              <div className="text-muted-foreground text-left space-y-2">
                {isRejected ? (
                  <>
                    <p>
                      Our administrative team has reviewed your application and
                      found that it doesn't meet our current requirements. Common
                      reasons for rejection include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Insufficient or unclear credential documentation</li>
                      <li>Professional experience requirements not met</li>
                      <li>Incomplete or vague service description</li>
                    </ul>
                    <p>
                      You can update your application with more information and
                      resubmit it for review.
                    </p>
                  </>
                ) : (
                  <p>
                    Your profile is currently under review by our administrative
                    team. This process typically takes 1–2 business days. You'll
                    receive an email notification once your account is verified.
                  </p>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-center mb-6">
              {isRejected
                ? "You can update your doctor profile and resubmit it for verification."
                : "While you wait, feel free to explore our platform or reach out to support with any questions."}
            </p>

            <div className="flex justify-center">
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Link href={isRejected ? "/onboarding" : "/"}>
                  {isRejected ? "Update Profile" : "Return to Home"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPage;
