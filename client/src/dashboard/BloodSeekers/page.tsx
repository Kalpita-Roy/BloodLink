import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";
// import Footer from "../../components/Footer.tsx";

interface BloodDonor {
  id: number;
  name: string;
  bloodType: string;
  location: string;
}

const BloodSeekersPage = () => {
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<BloodDonor[]>([]);
  const [bloodType, setBloodType] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // Fetch donors from the API
  const fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blooddonors"); // Adjust the endpoint as necessary
      setDonors(response.data);
      setFilteredDonors(response.data); // Initialize filtered donors
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  // Filter donors based on blood type and location
  useEffect(() => {
    const filtered = donors.filter((donor) => {
      return (
        (bloodType ? donor.bloodType === bloodType : true) &&
        (location
          ? donor.location.toLowerCase().includes(location.toLowerCase())
          : true)
      );
    });
    setFilteredDonors(filtered);
  }, [bloodType, location, donors]);

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      <header className="sticky top-0 z-10 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">BloodLink</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              About
            </Link>
            <Link
              to="/bloodseekers"
              className="text-gray-600 hover:text-gray-800 transition"
            >
              Find Blood
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Link to="/register/blood-bank">
              <Button variant="outline" className="hidden md:inline-flex">
                Register as Blood Bank
              </Button>
            </Link>
            <Link to="/register/donor">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="my-4">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-4 border rounded p-2 shadow hover:shadow-lg w-76 "
        >
          <option value="">Select your Sub-Division</option>
          <option value="Dukli">Dukli</option>
          <option value="Jirania">Jirania</option>
          <option value="Mohanpur">Mohanpur</option>
          <option value="Mandwi">Mandwi</option>
          <option value="Khowai">Khowai</option>
          <option value="Teliamura">Teliamura</option>
          <option value="Tulasikhar">Tulasikhar</option>
          <option value="Bishalgarh">Bishalgarh</option>
          <option value="Melaghar">Melaghar</option>
          <option value="Matabari">Matabari</option>
          <option value="Amarpur">Amarpur</option>
          <option value="Rajnagar">Rajnagar</option>
          <option value="Bakafa">Bakafa</option>
          <option value="Satchand">Satchand</option>
          <option value="Rupaichari">Rupaichari</option>
          <option value="Kadamtala">Kadamtala</option>
          <option value="Kanchanpur">Kanchanpur</option>
          <option value="Panisagar">Panisagar</option>
          <option value="Salema">Salema</option>
          <option value="Gandacherra">Gandacherra</option>
          <option value="Chawmanu">Chawmanu</option>
        </select>
        <br />
        <select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          className="mb-2 border rounded p-2 shadow hover:shadow-lg w-76"
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map((donor) => (
          <div key={donor.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="font-bold text-lg">{donor.name}</h2>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Location: {donor.location}</p>
            {/* Add any additional donor information here */}
            <Button
              className="mt-2"
              onClick={() => alert(`Contact ${donor.name}`)}
            >
              Contact
            </Button>
          </div>
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <p className="mt-4 text-center">
          No donors found matching your criteria.
        </p>
      )}
      

      {/* <div className="inset-x-0 bottom-0">
        <Footer />
      </div> */}
    </div>
  );
};

export default BloodSeekersPage;
