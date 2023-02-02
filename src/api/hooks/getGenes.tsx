import React from "react";
import axios from "axios";
import { useQuery, QueryCache } from "react-query";
import { getGenes } from "../gene-api";

export default function getDraftees() {
  return useQuery("genes", getGenes, {
    onError: (error) => {
      console.log("ERROR", error);
    },
  });
}
