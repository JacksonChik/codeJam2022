package trip_planner.util;

import java.util.*;

import trip_planner.entity.Load;
import trip_planner.entity.Vertex;

import java.time.LocalDateTime;

public class TripPlanner {
    private final List<Load> allAvailableLoads = new ArrayList<>();

    public TripPlanner(List<Load> loads) {
        for (Load l : loads){
            allAvailableLoads.add(new Load(l));
        }
        // sort the loads from earliest pickup time
        this.allAvailableLoads.sort((o1, o2) -> o1.arriveTime.compareTo(o2.arriveTime));
    }

    public static LocalDateTime plusTime(LocalDateTime dateTime, double hours){
        long h = (long) Math.floor(hours);
        long m = (long) Math.floor((hours - h) * 60);
        long s = (long) Math.floor(((hours - h) * 60 - m) * 60);
        LocalDateTime newDateTime;
        newDateTime= dateTime.plusHours(h);
        newDateTime = newDateTime.plusMinutes(m);
        newDateTime = newDateTime.plusSeconds(s);
        return newDateTime;
    }

    public Integer[] plan(Vertex start, LocalDateTime startTime, LocalDateTime maxDestTime){
        // find loads that are within the queried time window
        List<Load> loadsToConsider = new ArrayList<>();
        for (Load l : allAvailableLoads){
            if (plusTime(startTime, Vertex.hours(l.start, start)).compareTo(l.pickupTime) <= 0
            && maxDestTime.compareTo(l.arriveTime) >= 0)
                loadsToConsider.add(l);
        }

        // find the last load of the optimal trip
        Load curLoad = find_optimal(loadsToConsider, start, startTime, maxDestTime);
        if (curLoad == null) return new Integer[0];
        // get the entire trip by backtracking to root.
        List<Integer> loadList = new ArrayList<>();
        loadList.add(curLoad.loadID);
        while (curLoad.lastLoad != null){
            loadList.add(curLoad.lastLoad.loadID);
            curLoad = curLoad.lastLoad;
        }
        Integer[] loadArray = new Integer[loadList.size()];
        for (int i=0; i<loadArray.length; i++){
            loadArray[i] = loadList.get(loadList.size()-1-i);
        }
        return loadArray;
    }

    /**
     *
     * @param loads
     * @param start
     * @param end
     * @param time
     * @return index of the earliest load that the trucker can take
     */
    public int searchEarliestLoad(List<Load> loads, int start, int end, LocalDateTime time){
        if (start <= end){
            int e = (start + end) / 2;
            if (loads.get(e).pickupTime.compareTo(time) > 0){
                return searchEarliestLoad(loads, start, e-1, time);
            }
            else if (loads.get(e).pickupTime.compareTo(time) < 0){
                return searchEarliestLoad(loads, e+1, end, time);
            }
            return e;
        }

        return start; // return the later load
    }

    public int searchLatestLoad(List<Load> loads, int start, int end, LocalDateTime time){
        if (start <= end){
            int e = (start + end) / 2;
            if (loads.get(e).arriveTime.compareTo(time) > 0){
                return searchLatestLoad(loads, start, e-1, time);
            }
            else if (loads.get(e).arriveTime.compareTo(time) < 0){
                return searchLatestLoad(loads, e+1, end, time);
            }
            return e;
        }
        return end; // return the earlier load
    }

    public Load find_optimal(List<Load> loads, Vertex start, LocalDateTime startTime, LocalDateTime destTime){
    	if (loads.size() == 0) return null;
    	
        List<Vertex> vertexList = new ArrayList<>();
        for (Load l : loads){
            vertexList.add(l.start);
            vertexList.add(l.destination);
        }
        vertexList.add(start);
        Map<Set<Vertex>, Double> hours = new HashMap<>();
        Map<Set<Vertex>, Double> costs = new HashMap<>();
        for (int i=0; i<vertexList.size(); i++){
            for (int j=0; j<=i; j++){
                Set<Vertex> pair = new HashSet<>();
                Vertex v1 = vertexList.get(i);
                Vertex v2 = vertexList.get(j);
                pair.add(v1);
                pair.add(v2);
                hours.put(pair, Vertex.hours(v1, v2));
                costs.put(pair, Vertex.fuelCost(v1, v2));
            }
        }

        /*
        computer p(i). p(i) = index of load with latest (arrival time + time to the vertex of this load)
         */
        int[] p = new int[loads.size()];
        p[0] = -1;
        for (int i=1; i<p.length; i++){
            int lastCompatible = -1;
            //LocalDateTime latestArrivalTime = null;
            for (int j=i-1; j>=0; j--){
                Set<Vertex> pair = new HashSet<>();
                pair.add(loads.get(i).start);
                pair.add(loads.get(j).destination);
                LocalDateTime arrivalTime = plusTime(loads.get(j).arriveTime, hours.get(pair));
                if (arrivalTime.compareTo(loads.get(i).pickupTime) <= 0){
                    lastCompatible = j;
                    break;
                }
            }
            p[i] = lastCompatible;
        }

        double[] opt = new double[loads.size()+1];
        Load[] lastLoadArray = new Load[loads.size()+1];
        opt[0] = 0;
        lastLoadArray[0] = null;
        for (int i=0; i<loads.size(); i++){
            Load curLoad = loads.get(i);
            double curNetProfit = curLoad.profit;
            Set<Vertex> pair = new HashSet<>();
            pair.add(curLoad.start);
            if(p[i] == -1 || lastLoadArray[p[i]+1] == null){
                pair.add(start);
            } else{
                pair.add(lastLoadArray[p[i]+1].destination);
                curNetProfit += opt[p[i]+1];
            }
            curNetProfit -= costs.get(pair);

            if (curNetProfit > opt[i]){
                opt[i+1] = curNetProfit;
                lastLoadArray[i+1] = curLoad;
                curLoad.lastLoad = p[i] == -1? null : loads.get(p[i]);
            }
            else{
                opt[i+1] = opt[i];
                lastLoadArray[i+1] = lastLoadArray[i];
            }
        }

        return lastLoadArray[lastLoadArray.length-1];
    }

}

