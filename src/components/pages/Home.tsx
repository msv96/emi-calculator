"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { numericFormatter } from "react-number-format";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Slider } from "../ui/slider";

const Home = () => {
  const [result, setResult] = useState({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
  });
  const form = useForm({
    defaultValues: {
      loanAmount: 1000000,
      interestRate: 6.5,
      loanTenure: 5,
    },
  });

  const calculateEmi = () => {
    const loanAmount = form.getValues("loanAmount");
    const interestRate = form.getValues("interestRate") / 100 / 12;
    const loanTenure = form.getValues("loanTenure") * 12;

    const roi = Math.pow(1 + interestRate, loanTenure);
    const emi = (loanAmount * interestRate * roi) / (roi - 1);

    setResult({
      emi,
      totalInterest: emi * loanTenure - loanAmount,
      totalAmount: emi * loanTenure,
    });
  };

  useEffect(() => {
    calculateEmi();
  }, []);

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-6">
                  <div className="flex justify-between">
                    <FormLabel>Loan amount</FormLabel>
                    <div className="flex items-center gap-2 px-2 bg-slate-100 rounded-xs">
                      <div className="text-sm">₹</div>
                      <FormControl>
                        <input
                          type="number"
                          className="w-20"
                          step={10000}
                          min={10000}
                          max={10000000}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            calculateEmi();
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormControl>
                    <Slider
                      step={10000}
                      min={10000}
                      max={10000000}
                      value={[field.value]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        calculateEmi();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-6">
                  <div className="flex justify-between">
                    <FormLabel>Rate of interest (p.a.)</FormLabel>
                    <FormControl>
                      <input
                        className="w-18 px-2 bg-slate-100 rounded-xs"
                        step={0.1}
                        min={1}
                        max={30}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          calculateEmi();
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormControl>
                    <Slider
                      step={0.1}
                      min={1}
                      max={30}
                      value={[field.value]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        calculateEmi();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanTenure"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-6">
                  <div className="flex justify-between">
                    <FormLabel>Loan tenure</FormLabel>
                    <FormControl>
                      <input
                        className="w-16 px-2 bg-slate-100 rounded-xs"
                        step={1}
                        min={1}
                        max={30}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          calculateEmi();
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormControl>
                    <Slider
                      step={1}
                      min={1}
                      max={30}
                      value={[field.value]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        calculateEmi();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="pt-6 border-t">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <div>Monthly EMI</div>
            <div>
              {numericFormatter(Math.round(result.emi).toString(), {
                prefix: "₹ ",
                thousandSeparator: true,
                thousandsGroupStyle: "lakh",
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div>Total Principal</div>
            <div>
              {numericFormatter(
                Math.round(form.getValues("loanAmount")).toString(),
                {
                  prefix: "₹ ",
                  thousandSeparator: true,
                  thousandsGroupStyle: "lakh",
                }
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div>Total Interest</div>
            <div>
              {numericFormatter(Math.round(result.totalInterest).toString(), {
                prefix: "₹ ",
                thousandSeparator: true,
                thousandsGroupStyle: "lakh",
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div>Total Amount</div>
            <div>
              {numericFormatter(Math.round(result.totalAmount).toString(), {
                prefix: "₹ ",
                thousandSeparator: true,
                thousandsGroupStyle: "lakh",
              })}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Home;
