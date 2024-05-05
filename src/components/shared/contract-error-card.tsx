import type { Models } from 'appwrite';
import { Pencil, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ContractErrorCardProps {
  contract: Models.Document;
  onDeleteContract: (contractId: string) => void;
}

export function ContractErrorCard({
  contract,
  onDeleteContract,
}: ContractErrorCardProps) {
  return (
    <Card className="flex flex-col flex-center p-4">
      <p>
        Contract {contract.type}: {contract.address} is not found
      </p>
      <div className="flex gap-2 mt-2">
        <Link to={`/edit-contract/${contract.$id}`}>
          <Button size="sm">
            <Pencil className="mr-2 w-4 h-4" />
            Edit
          </Button>
        </Link>
        <Button size="sm" onClick={() => onDeleteContract(contract.$id)}>
          <Trash className="mr-2 w-4 h-4" />
          Delete
        </Button>
      </div>
    </Card>
  );
}
