import React, { useState } from "react";

//styles
import {
  Wrapper,
  Grid,
  LoginHeader,
  SocialMediaLinks,
  SocialMediaLinksContainer,
} from "./LoginElements";

//components
import { Input, Form } from "../../components/Forms";
import { Card } from "../../components/Card";
import Button from "../../components/Button";

//icons
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const handleClick = () => {
  console.log("clicked");
};

const Signup = () => {
  return (
    <Wrapper>
      <Card className="loginCard" id="card">
        <LoginHeader>
          <span>Tasked</span>
        </LoginHeader>
        <Form>
          <Grid>
            <Input type="email" placeholder="Email" corners="5px" />
            <Input type="password" placeholder="Password" corners="5px" />
            <Button
              background="#2A6FE9"
              border="none"
              corners="10px"
              fontColor="white"
            >
              Create
            </Button>
          </Grid>

          <div className="policyContainer">
            By signing up, you agree to our <a href="#">Terms of Use</a> and
            <a href="#"> Privacy Policy</a>.
          </div>
        </Form>
        <LoginHeader>Or</LoginHeader>

        <SocialMediaLinksContainer>
          <SocialMediaLinks>
            <FaFacebook color="#2A6FE9" />
            Facebook
          </SocialMediaLinks>
          <SocialMediaLinks>
            <FcGoogle /> Google
          </SocialMediaLinks>
        </SocialMediaLinksContainer>
      </Card>
    </Wrapper>
  );
};

export default Signup;
