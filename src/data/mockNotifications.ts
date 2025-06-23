export interface Notification {
  id: string;
  subjectName: string;
  title: string;
  publishedDate: string;
  isRead: boolean;
  fileUrl: string;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    subjectName: 'Data Structures',
    title: 'Advanced Trees and Graphs Study Material',
    publishedDate: '2024-01-20',
    isRead: false,
    fileUrl: '/subjects/data-structures',
  },
  {
    id: '2',
    subjectName: 'Database Systems',
    title: 'SQL Query Optimization Techniques',
    publishedDate: '2024-01-18',
    isRead: false,
    fileUrl: '/subjects/database-systems',
  },
  {
    id: '3',
    subjectName: 'Computer Networks',
    title: 'Network Security Protocols',
    publishedDate: '2024-01-15',
    isRead: true,
    fileUrl: '/subjects/computer-networks',
  },
];
