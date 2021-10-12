import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema";

//styles
import {
  Wrapper,
  Grid,
  LoginHeader,
  SocialMediaLinks,
  SocialMediaLinksContainer,
} from "./LoginElements";

//context
import AuthContext from "../../context/auth/authContext";

//components
import { Input, Form } from "../../components/Forms";
import { Card } from "../../components/Card";
import Button from "../../components/Button";
import { Banner } from "../../components/Banner";

//icons
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const history = useHistory();

  const { login, isAuthenticated, error } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitLoginForm = (data) => {
    login(data);

    history.push("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <Wrapper>
      <Card className="loginCard" id="card">
        <LoginHeader>
          <span>Tasked</span>
        </LoginHeader>

        {Object.keys(errors).length !== 0 && (
          <Banner
            show={errors}
            background="var(--danger)"
            fontColor="var(--lightGrey)"
          >
            <p>{errors.email?.message}</p>
            <p>{errors.password?.message}</p>
          </Banner>
        )}

        {error && (
          <Banner background="var(--danger)" fontColor="var(--lightGrey)">
            <p>{error}</p>
          </Banner>
        )}

        <Form onSubmit={handleSubmit(submitLoginForm)}>
          <Grid>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              corners="5px"
            />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              corners="5px"
            />
            <Button
              type="submit"
              background="#2A6FE9"
              border="none"
              corners="10px"
              fontColor="white"
            >
              Create
            </Button>
          </Grid>

          <div className="policyContainer">
            By signing up, you agree to our{" "}
            <a href="https://policies.google.com/terms?hl=en-US">
              Terms of Use{" "}
            </a>
            and{" "}
            <a href="https://policies.google.com/privacy?hl=en-US">
              Privacy Policy
            </a>
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

export default Login;
