import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Calendar,
  Clock,
  MapPin,
  Mountain,
  Award,
  ChevronRight,
  Users,
  Edit,
  Share2,
  Flag,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getUserProfile } from "@/app/api/profile/action";

export default async function ProfilePage() {
  const session = await auth();
  const user = await getUserProfile();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-48 bg-blue-600 relative">
            {/* Banner Image */}
            <img
              src="/api/placeholder/1200/300"
              alt="Profile banner"
              className="w-full h-full object-cover"
            />

            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <Image
                  src={session?.user?.image}
                  width={200}
                  height={200}
                  alt="Photo de profile"
                ></Image>
              </div>
            </div>

            {/* Actions */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-blue-600 border-white"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  {/* <Button variant="outline">Edit Profile</Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* <Button
                variant="outline"
                size="sm"
                className="bg-white text-blue-600 border-white"
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button> */}
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-blue-600 border-white"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Partager
              </Button>
            </div>
          </div>

          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {session.user?.name || session.user?.email}
                </h1>
                <p className="text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {user?.city},{" "}
                  {user?.country}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Grimpeur
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Randonneur
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Skieur
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">28</p>
                    <p className="text-sm text-gray-500">Sommets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">145</p>
                    <p className="text-sm text-gray-500">Sorties</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-gray-500">Trophées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Dénivelé total</span>
                    <span className="text-sm font-medium">85,450 m</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-100" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Distance parcourue
                    </span>
                    <span className="text-sm font-medium">1,245 km</span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-100" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Temps en montagne
                    </span>
                    <span className="text-sm font-medium">480 heures</span>
                  </div>
                  <Progress value={75} className="h-2 bg-gray-100" />
                </div>

                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-xl font-bold text-blue-600">4,810 m</p>
                    <p className="text-xs text-gray-500">Altitude max</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-xl font-bold text-blue-600">12h30</p>
                    <p className="text-xs text-gray-500">Plus longue sortie</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Adventures */}
            <Card>
              <CardHeader>
                <CardTitle>Prochaines aventures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mont Blanc via Goûter</h4>
                      <p className="text-sm text-gray-500">
                        15-16 Juillet 2025
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          +2 compagnons
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Aiguille du Midi</h4>
                      <p className="text-sm text-gray-500">28 Juillet 2025</p>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs">
                          En attente
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-blue-600"
                >
                  Voir toutes les aventures planifiées
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Trophées récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((badge) => (
                    <div key={badge} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <Award className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="text-xs text-center">Sommet 4000m</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-blue-600"
                >
                  Voir tous les trophées
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="adventures" className="w-full">
              <TabsList className="w-full bg-white border-b rounded-none justify-start h-auto p-0">
                <TabsTrigger
                  value="adventures"
                  className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none"
                >
                  Aventures
                </TabsTrigger>
                <TabsTrigger
                  value="photos"
                  className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none"
                >
                  Photos
                </TabsTrigger>
                <TabsTrigger
                  value="companions"
                  className="py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none"
                >
                  Compagnons
                </TabsTrigger>
              </TabsList>

              <TabsContent value="adventures" className="mt-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Historique des aventures
                  </h3>
                  <Button variant="outline" size="sm">
                    Filtrer
                  </Button>
                </div>

                {/* Adventures List */}
                {[1, 2, 3, 4].map((adventure) => (
                  <Card key={adventure} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                        <img
                          src={`/api/placeholder/400/300`}
                          alt="Adventure"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xl font-semibold mb-1">
                              Mont Blanc via Goûter
                            </h4>
                            <p className="text-gray-500 flex items-center text-sm mb-3">
                              <MapPin className="h-4 w-4 mr-1" /> Chamonix,
                              France
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Terminé
                          </Badge>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          Une ascension réussie du plus haut sommet des Alpes
                          avec des conditions météorologiques idéales. Vue
                          spectaculaire depuis le sommet!
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>14-15 Juin 2024</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>12h30 de marche</span>
                          </div>
                          <div className="flex items-center">
                            <Mountain className="h-4 w-4 mr-1" />
                            <span>4,810m d'altitude</span>
                          </div>
                          <div className="flex items-center">
                            <Flag className="h-4 w-4 mr-1" />
                            <span>1,600m de dénivelé</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                <Button variant="outline" className="w-full mt-4">
                  Charger plus d'aventures
                </Button>
              </TabsContent>

              <TabsContent value="photos" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((photo) => (
                    <div
                      key={photo}
                      className="aspect-square bg-gray-200 rounded-md overflow-hidden relative group"
                    >
                      <img
                        src={`/api/placeholder/300/300`}
                        alt={`Mountain photo ${photo}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-end justify-start p-3 opacity-0 group-hover:opacity-100">
                        <div className="text-white">
                          <h5 className="font-medium text-sm">Mont Blanc</h5>
                          <p className="text-xs">Juin 2024</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  Charger plus de photos
                </Button>
              </TabsContent>

              <TabsContent value="companions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user?.companions.map((companion) => (
                    <Card key={companion.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={`/api/placeholder/100/100`}
                              alt={`Companion ${companion}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{companion.name}</h4>
                            <p className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {companion?.user?.city},{" "}
                              {companion?.user?.country}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs mr-3 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                16 aventures ensemble
                              </span>
                              <Mountain className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500 ml-1">
                                42 sommets
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Voir tous les compagnons
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
    //   {/* Profile Header */}
    //   <div className="flex flex-col md:flex-row gap-8 mb-8">
    //     <div className="flex-shrink-0">
    //       <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
    //         <span className="text-4xl text-white font-bold">
    //           {session.user?.name?.[0] || session.user?.email?.[0] || "A"}
    //         </span>
    //       </div>
    //     </div>
    //     <div className="flex-1">
    //       <div className="flex justify-between items-start">
    //         <div>
    //           <h1 className="text-white text-3xl font-bold">
    //             {session.user?.name || session.user?.email}
    //           </h1>
    //           <p className="text-gray-400 mt-2">Alpiniste Confirmé</p>
    //         </div>
    //         <Button
    //           variant="outline"
    //           className="border-slate-700 text-gray-400 hover:text-white"
    //         >
    //           <Settings className="w-4 h-4 mr-2" />
    //           Paramètres
    //         </Button>
    //       </div>

    //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
    //         <Card className="bg-white/5 border-slate-700 p-4">
    //           <div className="flex items-center gap-3">
    //             <Mountain className="w-5 h-5 text-sky-400" />
    //             <div>
    //               <p className="text-white text-lg font-semibold">12</p>
    //               <p className="text-gray-400 text-sm">Sommets</p>
    //             </div>
    //           </div>
    //         </Card>
    //         <Card className="bg-white/5 border-slate-700 p-4">
    //           <div className="flex items-center gap-3">
    //             <Trophy className="w-5 h-5 text-amber-400" />
    //             <div>
    //               <p className="text-white text-lg font-semibold">5</p>
    //               <p className="text-gray-400 text-sm">Trophées</p>
    //             </div>
    //           </div>
    //         </Card>
    //         <Card className="bg-white/5 border-slate-700 p-4">
    //           <div className="flex items-center gap-3">
    //             <Users className="w-5 h-5 text-emerald-400" />
    //             <div>
    //               <p className="text-white text-lg font-semibold">48</p>
    //               <p className="text-gray-400 text-sm">Compagnons</p>
    //             </div>
    //           </div>
    //         </Card>
    //         <Card className="bg-white/5 border-slate-700 p-4">
    //           <div className="flex items-center gap-3">
    //             <Clock className="w-5 h-5 text-rose-400" />
    //             <div>
    //               <p className="text-white text-lg font-semibold">127h</p>
    //               <p className="text-gray-400 text-sm">Temps Total</p>
    //             </div>
    //           </div>
    //         </Card>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Content Tabs */}
    //   <Tabs defaultValue="achievements" className="space-y-6">
    //     <TabsList className="bg-white/5 border-slate-700">
    //       <TabsTrigger
    //         value="achievements"
    //         className="data-[state=active]:bg-sky-600"
    //       >
    //         Réalisations
    //       </TabsTrigger>
    //       <TabsTrigger
    //         value="adventures"
    //         className="data-[state=active]:bg-sky-600"
    //       >
    //         Aventures
    //       </TabsTrigger>
    //       <TabsTrigger
    //         value="companions"
    //         className="data-[state=active]:bg-sky-600"
    //       >
    //         Compagnons
    //       </TabsTrigger>
    //     </TabsList>

    //     <TabsContent value="achievements">
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {[1, 2, 3, 4].map((_, i) => (
    //           <Card key={i} className="bg-white/5 border-slate-700 p-6">
    //             <div className="flex items-start gap-4">
    //               <div className="p-3 bg-amber-500/10 rounded-lg">
    //                 <Medal className="w-6 h-6 text-amber-500" />
    //               </div>
    //               <div>
    //                 <h3 className="text-white font-semibold">
    //                   Alpiniste Confirmé
    //                 </h3>
    //                 <p className="text-gray-400 text-sm mt-1">
    //                   Atteindre 10 sommets de plus de 3000m
    //                 </p>
    //                 <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
    //                   <span className="flex items-center">
    //                     <Calendar className="w-4 h-4 mr-2" />
    //                     Obtenu le 15 juin 2024
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </Card>
    //         ))}
    //       </div>
    //     </TabsContent>

    //     <TabsContent value="adventures">
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {[1, 2, 3, 4].map((_, i) => (
    //           <Card key={i} className="bg-white/5 border-slate-700 p-6">
    //             <div className="flex items-start gap-4">
    //               <div className="p-3 bg-sky-500/10 rounded-lg">
    //                 <Mountain className="w-6 h-6 text-sky-500" />
    //               </div>
    //               <div>
    //                 <h3 className="text-white font-semibold">Mont Blanc</h3>
    //                 <p className="text-gray-400 text-sm mt-1">
    //                   4,809 m • Chamonix, France
    //                 </p>
    //                 <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
    //                   <span className="flex items-center">
    //                     <Calendar className="w-4 h-4 mr-2" />
    //                     28 juin 2024
    //                   </span>
    //                   <span className="flex items-center">
    //                     <Clock className="w-4 h-4 mr-2" />
    //                     8h
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </Card>
    //         ))}
    //       </div>
    //     </TabsContent>

    //     <TabsContent value="companions">
    //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //         {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
    //           <Card
    //             key={i}
    //             className="bg-white/5 border-slate-700 p-6 text-center"
    //           >
    //             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 mx-auto mb-4 flex items-center justify-center">
    //               <span className="text-2xl text-white font-bold">JD</span>
    //             </div>
    //             <h3 className="text-white font-semibold">John Doe</h3>
    //             <p className="text-gray-400 text-sm mt-1">
    //               12 aventures ensemble
    //             </p>
    //             <Button
    //               variant="ghost"
    //               size="sm"
    //               className="mt-4 text-sky-400 hover:text-sky-300"
    //             >
    //               Voir le profil
    //             </Button>
    //           </Card>
    //         ))}
    //       </div>
    //     </TabsContent>
    //   </Tabs>
    // </div>
  );
}
