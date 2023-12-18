import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YourDataService {
  // Implement methods to fetch or calculate counts

  getCandidateCount(): number {
    // Fetch or calculate candidate count logic here
    return 10; // Replace with actual data retrieval or calculation
  }

  getUserCount(): number {
    // Fetch or calculate user count logic here
    return 20; // Replace with actual data retrieval or calculation
  }

  getRoleCount(): number {
    // Fetch or calculate role count logic here
    return 5; // Replace with actual data retrieval or calculation
  }
}



