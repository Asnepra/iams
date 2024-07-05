import React from "react";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BYBZaA3KIDa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AssetRequestForm() {
  return (
    <div className="mt-16 mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Request an Asset</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to request a new laptop, printer, or other asset.
        </p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              required
              type="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="asset-type">Asset Type</Label>
          <Select defaultValue="other">
            <SelectTrigger>
              <SelectValue placeholder="Select asset type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="printer">Printer</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="laptop">Laptop</Label>
          <Select defaultValue="macbook-pro">
            <SelectTrigger>
              <SelectValue placeholder="Select laptop model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="macbook-pro">MacBook Pro</SelectItem>
              <SelectItem value="macbook-air">MacBook Air</SelectItem>
              <SelectItem value="dell-xps">Dell XPS</SelectItem>
              <SelectItem value="hp-spectre">HP Spectre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="printer">Printer</Label>
          <Select defaultValue="hp-laserjet">
            <SelectTrigger>
              <SelectValue placeholder="Select printer model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hp-laserjet">HP LaserJet</SelectItem>
              <SelectItem value="canon-pixma">Canon PIXMA</SelectItem>
              <SelectItem value="epson-ecotank">Epson EcoTank</SelectItem>
              <SelectItem value="brother-mfc">Brother MFC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gradient">Gradient Color</Label>
          <Select defaultValue="blue-to-purple">
            <SelectTrigger>
              <SelectValue placeholder="Select gradient color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue-to-purple">Blue to Purple</SelectItem>
              <SelectItem value="green-to-teal">Green to Teal</SelectItem>
              <SelectItem value="red-to-orange">Red to Orange</SelectItem>
              <SelectItem value="pink-to-red">Pink to Red</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="details">Additional Details</Label>
          <Textarea
            id="details"
            placeholder="Enter any additional details"
            rows={4}
          />
        </div>
        <Button className="w-full" type="submit">
          Submit Request
        </Button>
      </form>
    </div>
  );
}
