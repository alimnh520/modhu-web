import "./globals.css";
import Provider from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "স্বর্ণমধু",
  description: "আমরা প্রাকৃতিক ও স্বাস্থ্যকর মধু সরবরাহে প্রতিশ্রুতিবদ্ধ। সরাসরি সুন্দরবন এবং গ্রামীণ অঞ্চল থেকে সংগ্রহ করা আট প্রকার খাঁটি মধু অনলাইনে পৌঁছে দিই আপনার দরজায়। স্বাস্থ্য, শক্তি এবং প্রাকৃতিক সুস্থতাই আমাদের লক্ষ্য।",
  icons: {
    icon: '/my-logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Provider>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
