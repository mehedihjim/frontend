import BatchCardGrid from "@/components/batch-card-grid/BatchCardGrid";

const BatchReadyDash = () => {
  return (
    <BatchCardGrid
      routePrefix="/farmer/batch-ready"
      pageType="makeReady"
    ></BatchCardGrid>
  );
};

export default BatchReadyDash;
