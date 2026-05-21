import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  const prisma = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  let service: ProductsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductsService(prisma as any);
  });

  it('should list active products with optional filters', async () => {
    prisma.product.findMany.mockResolvedValue([{ id: 'p1', title: 'Demo' }]);

    const result = await service.list({ q: 'demo', category: 'backend-apis' });

    expect(result).toEqual([{ id: 'p1', title: 'Demo' }]);
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          isActive: true,
          category: { slug: 'backend-apis' },
          OR: [
            { title: { contains: 'demo', mode: 'insensitive' } },
            { description: { contains: 'demo', mode: 'insensitive' } },
          ],
        }),
      }),
    );
  });

  it('should return active product by slug', async () => {
    prisma.product.findUnique.mockResolvedValue({
      id: 'p1',
      slug: 'portfolio-platform-api',
      title: 'Portfolio Platform API',
      isActive: true,
    });

    const result = await service.bySlug('portfolio-platform-api');

    expect(result).toEqual(
      expect.objectContaining({
        slug: 'portfolio-platform-api',
      }),
    );
  });

  it('should throw not found for missing product', async () => {
    prisma.product.findUnique.mockResolvedValue(null);

    await expect(service.bySlug('missing-product')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should throw not found for inactive product', async () => {
    prisma.product.findUnique.mockResolvedValue({
      id: 'p1',
      slug: 'inactive-product',
      title: 'Inactive',
      isActive: false,
    });

    await expect(service.bySlug('inactive-product')).rejects.toBeInstanceOf(NotFoundException);
  });
});
