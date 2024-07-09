import React from "react";

import Link from "next/link";
import Image from "next/image";

import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <Image
          src="https://res.cloudinary.com/dib9srrul/image/upload/v1720438188/assets/fdagb5mezyc1yupsnlhf.png"
          width={300}
          height={300}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
        />
        <h1 className="!my-0 text-6xl font-bold">
          <Balancer>Heyo Creator!!</Balancer>
        </h1>
        <h3 className="text-muted-foreground text-4xl font-semibold">
          <Balancer>Looking to have your own content platform?</Balancer>
          <br />
          <Balancer>Get started with chinchan</Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild>
            <Link href="http://app.localhost:3000/login">Sign Up</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="http://app.localhost:3000/dashboard">
              Go to App -{">"}
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

function page() {
  return (
    <div>
      <Hero />
    </div>
  );
}

export default page;
