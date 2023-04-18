using Microsoft.EntityFrameworkCore;
using SmartList.Models;

namespace SmartList.Repositories.Contexts
{
    public class SmartListContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItems { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=smartList;Username=postgres;Password=postgres");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasIndex(c => c.Name).IsUnique();
            modelBuilder.Entity<Product>().HasIndex(p => p.Name).IsUnique();
            modelBuilder.Entity<ShoppingList>().Property(sl => sl.CreatedDate).HasDefaultValueSql("NOW()");
            modelBuilder.Entity<ShoppingList>().Property(sl => sl.UpdatedDate).HasDefaultValueSql("NOW()").ValueGeneratedOnAddOrUpdate();


            // ShoppingListItems - nie może mieć 2 takich samych produktów w liście
        }
    }
}
