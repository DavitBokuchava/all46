import React from 'react';

const VendorTechnologiesFiltersState = () => {
  const vendors = {
    gpon: ["huawei", "zte"],
    dsl: ["huawei", "alcatel"]
  }

  const technologies = ["gpon", "dsl"]
  return {
    vendors,
    technologies
  };
}

export default VendorTechnologiesFiltersState;