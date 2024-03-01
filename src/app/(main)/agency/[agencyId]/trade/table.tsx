"use client"



import React,{useState} from "react";
import { Deposit } from "@prisma/client";
import { getAllDepo } from "@/lib/queries";
import UserDetails from "@/components/global/UserDetails";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import TransactionHistory from "@/components/forms/TransactionHistory";
import AgencyDetails from "@/components/forms/AgencyDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CrossIcon, Wallet } from "lucide-react";
import { v4 } from "uuid";

type Props = {}

const TableConponenet =  (props: Props) => {


    const rowsPerPage = 10;
    // const [data, setData] = useState<Post[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);
  
    
  return (
    <Card className="p-4 flex-1">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p> All transactions made on this acccount</p>
              <Separator className="mt-5 mb-2" />
            </CardDescription>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>METHOD</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  {/* <TableHead>DATE</TableHead> */}
                  <TableHead className="text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getAllDepo.slice(startIndex, endIndex).map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell className="font-medium">
                      {deposit.id.substring(0, 5)}
                    </TableCell>
                    <TableCell>{deposit.crypto}</TableCell>
                    <TableCell>${deposit.amount}.00</TableCell>
                    {/* <TableCell>{deposit.createdAt}</TableCell> */}
                    <TableCell className="text-right">
                      <Button
                        className={`text-right ${
                          deposit.status === "PENDING" && "bg-yellow-400"
                        }  

                      ${deposit.status === "SUCCESSFUL" && "bg-green-500"}

                      ${deposit.status === "CANCELLED" && "bg-red-500"}
                      
                      `}
                      >
                        {deposit.status}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                endIndex === 100 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage); //10
                setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
        </Card>
  )
}

export default TableConponenet