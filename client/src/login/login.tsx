"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  username: z.string().min(8, "Username must be at least 8 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const donorResponse = await axios.post("http://localhost:3000/blooddonor/signin", {
        name: values.username,
        password: values.password,
      })

      console.log(donorResponse.data)

      localStorage.setItem("token", donorResponse.data.token)
      localStorage.setItem("userType", "blooddonor")

      toast.success("Blood Donor Login successful!")
      navigate("/")
    } catch (donorError) {
      try {
        const bankResponse = await axios.post("http://localhost:3000/bloodbank/signin", {
          name: values.username,
          password: values.password,
        })

        console.log(bankResponse.data)

        localStorage.setItem("token", bankResponse.data.token)
        localStorage.setItem("userType", "bloodbank")

        toast.success("Blood Bank Login successful!")
        navigate("/dashboard")
      } catch (bankError) {
        console.error("Form submission error", bankError)
        toast.error("Invalid username or password. Please try again.")

        // New feature: Display error message in the form
        form.setError("username", {
          type: "manual",
          message: "Invalid username or password",
        })
        form.setError("password", {
          type: "manual",
          message: "Invalid username or password",
        })
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Username</FormLabel>
                  <FormControl>
                    <Input className="shadow hover:shadow-lg" placeholder="Enter username" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">Password</FormLabel>
                  <FormControl>
                    <Input className="shadow hover:shadow-lg" placeholder="Enter password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="min-w-40 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

