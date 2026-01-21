"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/basic-data-table";
import type { DataTableColumn } from "@/components/ui/basic-data-table";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [data2, setData2] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetch("/api/data")
        .then((response) => response.json())
        .then((data) => setData2(data));
    }
    fetchData();
    console.log(data2);
  }, []);

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Moderator",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
    },
  ];
  const columns: DataTableColumn<(typeof data2)[number]>[] = [
    { key: "ticker", header: "Ticker", sortable: false, filterable: false },
    { key: "company", header: "Company", sortable: false, filterable: true },
    {
      key: "asset_type",
      header: "Asset Type",
      sortable: false,
      filterable: false,
    },
    { key: "action", header: "Action", sortable: false, filterable: false },
    { key: "amount", header: "Amount", sortable: false, filterable: false },
    { key: "action_date", header: "Action Date", sortable: true },
    { key: "announce_date", header: "Announced", sortable: true },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Image
        src="/bg.png"
        alt="Pelosi"
        width={200}
        height={200}
        className="position absolute left-0 top-0  hover:cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl mt-10">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 mt-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
              See her latest trades
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track and analyze all trades as soon as they are reported. Filter
              by ticker, date, and type to stay informed.
            </p>
          </div>

          {/* Trades Table */}
          {data2.length > 0 ? (
            <DataTable
              data={data2}
              columns={columns}
              itemsPerPage={10}
              searchable={false}
            />
          ) : (
            <h1>
              Took the live database down unfortunately. Ping me if you want
              access.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
