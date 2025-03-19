
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, User, Mail, Phone, Globe, Building2 } from 'lucide-react';
import { debounce, Trie } from '@/utils/searchUtils';
import { toast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const UserSearch = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const trieRef = useRef<Trie>(new Trie());
  
  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data: UserData[] = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        
        // Build the trie with user data
        const trie = new Trie();
        data.forEach(user => {
          trie.insert(user.name, user);
          trie.insert(user.username, user);
          trie.insert(user.email, user);
        });
        
        trieRef.current = trie;
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (!term.trim()) {
        setFilteredUsers(users);
        return;
      }
      
      // Use the trie to search
      const results = trieRef.current.search(term);
      
      // Remove duplicates (same user might be found multiple times)
      const uniqueResults = Array.from(
        new Map(results.map(user => [user.id, user])).values()
      );
      
      setFilteredUsers(uniqueResults);
    }, 300),
    [users]
  );
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  
  // Get initials from user's name for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get a background color based on the user's ID for the avatar
  const getAvatarColor = (id: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-yellow-100 text-yellow-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-orange-100 text-orange-800',
    ];
    return colors[id % colors.length];
  };
  
  return (
    <section id="users" className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Our Users</h2>
            <p className="text-gray-600">Search our directory of users by name, username, or email.</p>
          </div>
          
          {/* Search input */}
          <Card className="mb-8 animate-fade-up shadow-md">
            <CardContent className="p-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                />
              </div>
            </CardContent>
          </Card>
          
          {/* User cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="animate-pulse overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <Card 
                  key={user.id} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-up group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 w-full"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-5">
                      <Avatar className={`w-14 h-14 mr-4 transition-transform group-hover:scale-105 ${getAvatarColor(user.id)}`}>
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1">{user.name}</h3>
                        <Badge variant="outline" className="mt-1 font-normal text-xs">
                          @{user.username}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 text-green-500" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4 text-purple-500" />
                        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer"
                           className="hover:text-blue-500 transition-colors truncate">
                          {user.website}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground pt-1">
                        <Building2 className="h-4 w-4 text-orange-500" />
                        <span className="italic truncate">{user.company.name}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No users found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSearch;
