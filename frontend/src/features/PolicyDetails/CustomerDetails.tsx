import { FormEvent, useContext } from "react";
import { PolicyContext } from "../Policies/PoliciesContext"
import { Button } from "@/components/Button";
import { formatDate, isEmpty } from "./formatter";
import { fetchData } from "../HttpClient/Requests";
import { Link } from "wouter";

export const CustomerDetails = () => {
  const policy = useContext(PolicyContext);
  const handleSubmit = (event: FormEvent | HTMLFormElement) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let updated = {};
    for (let [key, value] of formData.entries()) {
      if (policy && (value as string).length && (policy.customer as any)[key] !== value) {
        updated = {
          ...updated,
          [key]: value
        }
      }
    }
    if (!isEmpty(updated)) {
      fetchData(`https://cher-ami.onrender.com/customers/${policy?.customer?.id}`, {
        method: "PUT",
        data: updated,
      });
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <form className="py-4 px-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            First name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="name" type="text" placeholder="Enter first name" defaultValue={policy?.customer.firstName} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Last name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="name" type="text" placeholder="Enter last name" defaultValue={policy?.customer.lastName} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="email" type="email" name="email" placeholder="Enter email" defaultValue={policy?.customer.email} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Birth date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="date" type="date" placeholder="Select a date" defaultValue={formatDate(policy?.customer.dateOfBirth)} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <Link href="~/"><Button>Back</Button></Link>
          <Button type="submit">Edit account</Button>
        </div>
      </form>
    </div>
  )
}