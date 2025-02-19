'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AttendanceManagementPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>

      <div className="flex gap-4 mb-6">
        <Input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-48"
        />
        <Button>Record Attendance</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{/* Add attendance data here */}</TableBody>
        </Table>
      </div>
    </div>
  );
}
