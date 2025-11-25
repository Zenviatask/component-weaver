import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-800">Configurações</h1>
          <p className="text-xl text-gray-600">Configure seu sistema aqui</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
