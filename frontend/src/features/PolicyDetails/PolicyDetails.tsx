import { FormEvent, useContext } from "react";
import { PolicyContext } from "../Policies/PoliciesContext"
import { Button } from "@/components/Button";
import { capitalizeFirstLetter, formatDate, isEmpty } from "./formatter";
import { fetchData } from "../HttpClient/Requests";
import { Link } from "wouter";

export const PolicyDetails = () => {
  const policy = useContext(PolicyContext);
  console.log(policy)

  const handleSubmit = (event: FormEvent | HTMLFormElement) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let updatedPolicy = {};
    for (let [key, value] of formData.entries()) {
      if (policy && (value as string).length && (policy as any)[key] !== value) {
        updatedPolicy = {
          ...updatedPolicy,
          [key]: value
        }
      }
    }
    if (!isEmpty(updatedPolicy)) {
       fetchData(`https://cher-ami.onrender.com/policies/${policy?.id}`, {
        method: "PUT",
        data: updatedPolicy,
      });
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <form className="py-4 px-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            {policy?.id}
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="insuranceType">
            Policy type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="insuranceType" name="insuranceType">
            <option value={policy?.insuranceType}>{capitalizeFirstLetter(policy?.insuranceType)}</option>
            {policy?.insuranceType !== "HEALTH" && <option value="HEALTH">Health</option>}
            {policy?.insuranceType !== "HOUSEHOLD" && <option value="HOUSEHOLD">Household</option>}
            {policy?.insuranceType !== "LIABILITY" && <option value="LIABILITY">Liability</option>}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="price" type="number" name="price" data-input-counter-min="0" placeholder="Enter price" defaultValue={policy?.price} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="provider">
            Previous insurance
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="provider" type="text" placeholder="Enter previous insurance provider" defaultValue={policy?.provider} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="date">
            Start date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="startDate" type="date" placeholder="Select a date" defaultValue={formatDate(policy?.startDate)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="service">
            Policy status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
            id="status" name="status">
            <option value={policy?.status}>{policy?.status}</option>
            {policy?.status !== "ACTIVE" && <option value="ACTIVE">Active</option>}
            {policy?.status !== "PENDING" && <option value="PENDING">Pending</option>}
            {policy?.status !== "CANCELLED" && <option value="CANCELLED">Cancelled</option>}
            {policy?.status !== "DROPPED_OUT" && <option value="DROPPED_OUT">Rejected</option>}
          </select>
        </div>
        {/* <div className="mb-4">
          ``             <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message" rows={4} placeholder="Enter any additional information"></textarea>
        </div> */}
        <div className="flex items-center justify-between mb-4">
          <Link href="~/"><Button>Back</Button></Link>
          <Button type="submit">Edit policy</Button>
        </div>

      </form>
    </div>
  )
}