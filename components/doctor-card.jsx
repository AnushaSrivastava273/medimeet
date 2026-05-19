import { User, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Ensure you have this component

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all">
      <CardContent className="flex gap-4 items-start">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-emerald-900/20 justify-center flex items-center flex-shrink-0">
          {doctor.imageUrl ? (
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-emerald-400" />
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h3 className="font-medium text-white text-lg">{doctor.name}</h3>
            <Badge
              variant="outline"
              className="bg-emerald-900/20 border-emerald-900/30 text-white text-xs flex items-center gap-1 self-start sm:self-auto"
            >
              <Star className="h-3 w-3" />
              Verified
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-1">
            {doctor.specialty} · {doctor.experience} years experience
          </p>

          <div className="mt-4 line-clamp-2 text-sm text-muted-foreground">
            {doctor.description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
